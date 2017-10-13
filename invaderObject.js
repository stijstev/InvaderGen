let Invader = function (amPixelsX, amPixelsY, pixelSize, colors) {
    this.pixels = [];
    this.properties = {
        width: amPixelsX,
        height: amPixelsY,
        pxSize: pixelSize,
        colors: colors,
    }
    this.generate = function () {
        for (let i = 0; i < this.properties.height; i++) {
            let tempArray = [];
            for (let i = 0; i <= this.properties.width / 2 - 1; i++) {
                let pixel = {
                    exists: Math.round(Math.random()),
                    color: colors[Math.round(Math.random() * 2)].value,
                };
                tempArray[i] = pixel;
                tempArray[(this.properties.width - 1) - i] = pixel; //mirrors the generated pixel
            }
            this.pixels.push(tempArray);
        }
    };
    this.draw = function (canvas, x, y) {
        if (x == 'center') {
            x = canvas.width / 2 - ((this.properties.width / 2) * this.properties.pxSize);
        }
        if (y == 'center') {
            y = canvas.height / 2 - ((this.properties.height / 2) * this.properties.pxSize);
        }
        let ctx = canvas.getContext("2d"); //using a canvas, I ain't no barbarian
        ctx.imageSmoothingEnabled = false;
        canvas.width = canvas.width;
        let currentY = 0;

        for (let i = 0; i < this.properties.height; i++) {
            let currentX = 0;
            for (let i = 0; i <= this.pixels[currentY].length - 1; i++) {
                if (this.pixels[currentY][currentX].exists) {
                    ctx.fillStyle = this.pixels[currentY][currentX].color;
                    ctx.fillRect(x + (pixelSize * i), y + (this.properties.pxSize * currentY), this.properties.pxSize, this.properties.pxSize);
                    currentX++
                } else {
                    currentX++;
                }
            }
            currentY++
        }
    }
    this.createImage = function () {
        let canvas = document.querySelector("#invisibleCanvas"); //off-screen canvas
        canvas.width = this.properties.width * 40;
        canvas.height = this.properties.height * 40;

        let tempStore = this.properties.pxSize;
        this.properties.pxSize = 40;

        this.draw(canvas, 0, 0);
        this.properties.pxSize = tempStore;
        return canvas.toDataURL("image/png", 1);

    }
    this.saveToStorage = function () { //stores invader as a JSON in local storage
        let saveData = {};
        saveData.title = document.querySelector('#inputSaveName').value;
        saveData.desc = document.querySelector('#inputSaveDesc').value;
        saveData.image = this.createImage();
        saveData.date = new Date();
        saveData.pixels = this.pixels;
        saveData.props = this.properties;

        if (typeof (Storage) !== "undefined") {
            if (!localStorage.invaders) { //!localStorage.invaders
                let invaders = [];
                invaders.push(saveData);
                localStorage.setItem("invaders", JSON.stringify(invaders));
            } else {
                let invaders = JSON.parse(localStorage.getItem("invaders"));
                invaders.push(saveData);
                localStorage.setItem("invaders", JSON.stringify(invaders));
            }
        } else {
            userMessage('errorMessage', "Invader could not be saved. Your browser doesn't support local storage")
        }
        userMessage('userMessage', 'Your invader has been saved!');
    }
}