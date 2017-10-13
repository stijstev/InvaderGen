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
        if (isNaN(value) || value % 2 !== 0 || value == 0 || value < 0){ //checks if input width is a number, if it is a multiple of 2, if it is not 0 and if it is not a negative number, assume the user is a toddler
            userMessage('errorMessage', 'Please enter a valid width. Number must be a multiple of 2 and must not contain letters'); //notifies user of wrong input
        } else {
            return value; //if value is valid it gets returned
        }
    },
    pxSize: function(){
        let value = document.querySelector('#inputPxSize').value;
        if (isNaN(value) || value == 0 || value < 0){ //checks if the pixelsize is a number, if it is not 0 and if it is not a negative number, assume the user is a toddler
            userMessage('errorMessage', 'Please enter a valid pixel size. Field must not contain letters'); //notifies user of wrong input
        } else {
            return value; //if value is valid it gets returned
        }
    },
    binString: function(){
        return document.querySelector('#loadBinString').value;
    }
}
inputs.btnGenerate.addEventListener('click', function(e){
    e.preventDefault();

    canvas = document.querySelector('#pleaseInvade');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight*0.7);
    
    let width = inputs.width()
    invader = new Invader(width, width, inputs.pxSize(), inputs.colors());
    if (inputs.binString()) {
        invader.pixels = JSON.parse(inputs.binString()); //parse input string to JSON to use as pixels object for the draw function of invader
    } else {
        invader.generate(); //generates a binString (pixelarray)
    }
    invader.draw(canvas, 'center', 'center') //use paramater 'center' on x or y to center the invader

    let saveBinString = document.querySelector('#binStringSave');
    saveBinString.setAttribute('class', 'binStringSave');
    saveBinString.innerHTML = JSON.stringify(invader.pixels); //stringifies pixels object to display it in a div

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
    if (type == 'userMessage') {
        setTimeout(function(){elUserMessage.removeChild(document.querySelector('.userMessage'))}, 4000)
    } else {
        setTimeout(function(){elUserMessage.removeChild(document.querySelector('.errorMessage'))}, 4000);
    }
}