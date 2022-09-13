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
        context.drawImage(
            this.image,
            //Crop Position
            this.framesCurrent * (this.image.width / this.framesMax ),
            0,
            this.image.width / this.framesMax,
            this.image.height,

             //Position
             this.position.x - this.offset.x,
             this.position.y - this.offset.y,
             (this.image.width / this.framesMax) * this.scale,
             this.image.height * this.scale
        );
    }

    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;            
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
        
    }
}

//Character Class
class Fighter extends Sprite{
    //Generate Characters
    //Require : Position and Velocity of Characters
    constructor({ position,
        velocity,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox = {
            offset: {},
            width: undefined,
            height: undefined
        }
    }) {

        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity;
        this.lastkey;
        this.width = 50;
        this.height = 150;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
                
            },
            width: attackBox.width,
            height: attackBox.height,
            offset : attackBox.offset
        };

        this.isAttacking = false;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;

        }


        
    }


}