//Setting up Canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//Canvas Area
canvas.width = 1024;
canvas.height = 576;  

//Constant Values
const gravity = 0.7;
const fwdSpeed = 5;
const bwdSpeed = -5;
const jumpStregth = -20;   

//Filling the Canvas
context.fillRect(0, 0, canvas.width, canvas.height);

//Sprite(Graphics) Object
//Background
const background = new Sprite({
    position: {
        x: 0,
        y: 0 
    },
    imageSrc:'./img/background.png'
});

//Shop 
const shop = new Sprite({
    position: {
        x: 600,
        y: 128
        
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6

});
