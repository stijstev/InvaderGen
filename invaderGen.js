/*
    Written by Stijn Stevens, October 2017
    *Features:
    - Creates Space Invader-esque characters
    - Size of invader can be changed by the user
    *Notes: 
    - Try creating an invader 12x12 in size. Nice balance of detail and simplicity
 */

let canvas = document.querySelector('#pleaseInvade');
canvas.setAttribute('width', window.innerWidth-50);
canvas.setAttribute('height', window.innerHeight*0.8);

let inputs = {
    colors: function(){
        return document.querySelectorAll('.colorPicker');
    },
    btnGenerate: document.querySelector('#generateBtn'),
}
inputs.btnGenerate.addEventListener('click', function(e){
    e.preventDefault();
    let invader = new Invader();
    invader.generate(12, 12, inputs.colors()); //generates (but doesn't draw) the invader, requires two ints: width and height. Multiples of two only
    invader.draw(canvas, 'center', 'center', 15) //use paramater 'center' on x or y to center the invader
}, false);