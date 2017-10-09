/*
    Written by Stijn Stevens, October 2017
    *Features:
    - Creates Space Invader-esque characters
    - Size of invader can be changed by the user
    *Notes: 
    - Try creating an invader 12x12 in size. Nice balance of detail and simplicity
 */

let dynamicFavicon = true; //favicon changes dynamically if true
let invader = null;
let canvas = null;
let errors = [];

let inputs = {
    colors: function(){
        return document.querySelectorAll('.colorPicker');
    },
    btnGenerate: document.querySelector('#generateBtn'),
    btnSave: document.querySelector('#saveBtn'),
    width: function(){
        let value = document.querySelector('#inputWidth').value;
        if (isNaN(value) || value % 2 !== 0 || value == 0 || value < 0){
            userMessage('errorMessage', 'Please enter a valid width. Number must be a multiple of 2 and must not contain letters');
        } else {
            return value;
        }
    },
    pxSize: function(){
        let value = document.querySelector('#inputPxSize').value;
        if (isNaN(value) || value == 0 || value < 0){
            userMessage('errorMessage', 'Please enter a valid pixel size. Field must not contain letters');
        } else {
            return value;
        }
    }
}
inputs.btnGenerate.addEventListener('click', function(e){
    e.preventDefault();

    canvas = document.querySelector('#pleaseInvade');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight*0.7);
    
    let width = inputs.width()
    invader = new Invader(width, width, inputs.pxSize(), inputs.colors());
    invader.generate(); //generates (but doesn't draw) the invader, requires two ints: width and height. Multiples of two only
    invader.draw(canvas, 'center', 'center') //use paramater 'center' on x or y to center the invader

    if (dynamicFavicon) { //invader is re-rendered off-screen for the favicon
        document.querySelector('#favicon').href = invader.createImage();
    }
}, false);
inputs.btnSave.addEventListener('click', function(){
    if (typeof invader !== 'null') {
        invader.saveToStorage();
    } else {
        userMessage('errorMessage', 'There is nothing to save yet!');
    }
}, false);

function userMessage(type, message, timeout){
    if (!timeout) {
        timeout = 3500;
    }
    elUserMessage.innerHTML += `<p class="${type}">${message}</p>`;
    setTimeout(function(){elUserMessage.removeChild(document.querySelector('.errorMessage'))}, 4000);
    setTimeout(function(){elUserMessage.removeChild(document.querySelector('.userMessage'))}, 4000)
}