//Sprite(Animation) Class
class Sprite{
    //Generate Animation
    constructor({ position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
    }){
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.offset = offset;

        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;

    }

    draw() {



    }





}

