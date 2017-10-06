let Invader = function(){
    let pixels = [];
    this.generate = function(amPixelsX, amPixelsY, colors){
        for (let i = 0; i < amPixelsY; i++) {
            let tempArray = [];
            for (let i = 0; i <= amPixelsX/2 - 1; i++) {
                let pixel = {
                    exists: Math.round(Math.random()),
                    color: colors[Math.round(Math.random()*2)].value,
                };
                tempArray[i] = pixel;
                tempArray[(amPixelsX - 1) - i] = pixel;
            }
            pixels.push(tempArray);
        }
    };
    this.draw = function(canvas, x, y, pixelSize){
        if (x == 'center'){
            console.log("hi");
            x = canvas.width/2-((pixels[0].length/2) * pixelSize);
        }
        if (y == 'center'){
            y = canvas.height/2-((pixels.length/2) * pixelSize);
        }
        let ctx = canvas.getContext("2d"); //using a canvas, I ain't no barbarian
        canvas.width = canvas.width;
        let currentY = 0

        for (let i = 0; i < pixels.length; i++) {
            let currentX = 0;
            for (let i = 0; i <= pixels[currentY].length - 1; i++) {
                if (pixels[currentY][currentX].exists) {
                    ctx.fillStyle = pixels[currentY][currentX].color;
                    ctx.fillRect(x+(pixelSize * i), y + (pixelSize * currentY), pixelSize, pixelSize);
                    currentX++
                } else {
                    currentX++;
                }
            }
            currentY++
        }
    }
}