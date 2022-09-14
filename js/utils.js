//Collision Detection
function rectangularCollision(rectangle1, rectangle2) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

//Determine Winner when Timer hits Zero
function determineWinner({ player, enemy }) {
    //Checking Who Won Match 
    let displayResult = document.getElementById('displayResult');
   







} 