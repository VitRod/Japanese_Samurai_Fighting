//Sprite(Animation) Class
class Sprite{
    //Generate Animation
    constructor({ position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 }
    }) { 
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.offset = offset,

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

    update() {
        //Updating Postion of Characters according to cammonds
        this.draw();
        if(!this.dead) this.animateFrames();

        //Updating Attack Box Position
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        

        //Updating Position with Velocity
        // Check If Player doesn't over Canvas Height
        if (this.position.y < 0) {
            this.position.y += 1
        } else {
            this.position.y += this.velocity.y;
        }
        // Check If Player doesn't go behind left side of Canvas Width
        if (this.position.x < 0) {
            this.position.x += 1;
            // Check If Player doesn't go behind right side of Canvas Width
        } else if (this.position.x > 950) {
            this.position.x -= 1;
        } else {
            this.position.x += this.velocity.x;
        }
        //To make sure Character doesn't fall through floor of Canvas
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330;
        } else {
            //Giving Gravity to Characters
            this.velocity.y += gravity;
        }
    }
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true;

    }
    takeHit() {
        this.health -= 20;
        
        if (this.health <= 0) {
            this.switchSprite('death');
        } else {
            this.switchSprite('takeHit');
        }
    }
    

    switchSprite(sprite) {
        //Overridiing When Attack
        if (this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1
            ) {
            return;
        }
        //Overriding When Take hit
        if (this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
            
        ) {
            return
        }

        //Overriding When Character Dies
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true;
            }
            return
        }

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                };
                break;
        
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
                case 'fall':
                    if (this.image !== this.sprites.fall.image) {
                        this.image = this.sprites.fall.image;
                        this.framesMax = this.sprites.fall.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
                case 'attack1':
                    if (this.image !== this.sprites.attack1.image) {
                        this.image = this.sprites.attack1.image;
                        this.framesMax = this.sprites.attack1.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
            case 'takeHit':
                    if (this.image !== this.sprites.takeHit.image) {
                        this.image = this.sprites.takeHit.image;
                        this.framesMax = this.sprites.takeHit.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
                case 'death':
                    if (this.image !== this.sprites.death.image) {
                        this.image = this.sprites.death.image;
                        this.framesMax = this.sprites.death.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
            
        }
    }
}
