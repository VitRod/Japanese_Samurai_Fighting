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

//Character Object
//Player Object
const player = new Fighter({
    position:{
        x: 220,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
        
    },

    scale: 2.5,

    offset: {
        x: 215,
        y: 157
    },

    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
            
        },
        width: 140,
        height: 50

    }
})

//Enemy Object
const enemy = new Fighter({
    position:{
        x: 710,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
        
    },
    scale: 2.5,

    offset: {
        x: 215,
        y: 167
     
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
            
        },
        width: 170,
        height: 50
        
    }

})

//Pressed Keys
const keys = {
    a: {
        pressed: false
        
    },
    d: {
        pressed: false

    },

    ArrowLeft: {
        pressed: false

    },
    ArrowRight: {
        pressed: false
        
    }
}

//CountDown
decreaseTimer();


//Animate The Canvas 
function animate() {
    //Recursuive Function

    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Rendering Graphics
    background.update();
    shop.update();

    //Opacity on backgroud
    context.fillStyle = 'rgba(255,255,255,0.15)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Rendering Characters Hitbox
    player.update();
    enemy.update();

    //Player Movement
    player.velocity.x = 0;

    if (keys.a.pressed && player.lastkey === 'a') {
        //Runing Left
        player.velocity.x = bwdSpeed;
        player.switchSprite('run');

    } else if (keys.d.pressed && player.lastkey === 'd') {
        //Runing Right
        player.velocity.x = fwdSpeed;
        player.switchSprite('run');
    } else {
        //Standing Idle
        player.switchSprite('idle');
    }

    //Jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');   
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');   
        
    }



    //Enemy Movement
    enemy.velocity.x = 0;
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        //Runing Left
        enemy.velocity.x = bwdSpeed;
        enemy.switchSprite('run');

    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        //Runing Right
        enemy.velocity.x = fwdSpeed;
        enemy.switchSprite('run');

    } else {
        //Standing Idle
        enemy.switchSprite('idle');
    }

    //Jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');   
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');   
        
    }

    //Detect For Collision
    //Attack on Enemy
    if (
        rectangularCollision(player, enemy) &&
        player.isAttacking &&
        player.framesCurrent === 4
        
    ) {
        enemy.takeHit();
        player.isAttacking = false;
        
        gsap.to('#enemyHealth', {
            width:enemy.health + '%'
        })
    }
    //Player Misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    //Attack on Player
    if (
        rectangularCollision(enemy, player) &&
        enemy.isAttacking &&
        enemy.framesCurrent === 2
        
    ) {
        player.takeHit();
        enemy.isAttacking = false;
        
        gsap.to('#playerHealth', {
            width:player.health + '%'
        })
    }
    //Player Misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }

    //End Game When Health is Zero
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy });
    }
    

}
animate();

//Adding Movement with Event Listners
//KeyDown 
window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            //Player Control
            case 'd':
                keys.d.pressed = true;
                player.lastkey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastkey = 'a';
                break;
            case 'w':
                player.velocity.y = jumpStregth;
                break;
            case ' ':
                player.attack();
                break;
        }
    }
    
        
        //Enemy Control
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastkey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastkey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                enemy.velocity.y = jumpStregth;
                break;
            case '0':
                enemy.attack();
                break;
            }
    }
         
}
);

//KeyUp
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //Player Control
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        
        //Enemy Control
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
}
);