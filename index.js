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
