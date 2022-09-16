//Collision Detection
function rectangularCollision(rectangle1, rectangle2) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
    
}

//TDetermine Winner when Timer hits Zero
function determineWinner({ player, enemy }) {
    //Checking Who Won Match 
    let displayResult = document.getElementById('displayResult');
    clearTimeout(timerId);
    displayResult.style.display = 'flex';

    if (player.health === enemy.health) {
        displayResult.innerHTML = 'Draw';   
    } else if (player.health > enemy.health) {
        displayResult.innerHTML = 'Player 1 Wins';
    } else if (player.health < enemy.health) {
        displayResult.innerHTML = 'Player 2 Wins';
    }
}

//Timer
let timer = 60;
let timerId;

//Countdown
function decreaseTimer() {
    //CountDown Function
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.getElementById('timer').innerHTML = timer;
    }
    if (timer === 0) {
        //Checking Who Wins After Countdown Hit Zero
        determineWinner({ player, enemy });
        
    }

}