var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");  // this variable is the actual tool that allows us to paint on the canvas//
var x = canvas.width/2;
var y = canvas.height -30;  // the x and y variables define a starting point for the ball at bottom center of the canvas//
var dx = 2;
var dy = -2;  //these variables give a small value to the x & y variables after every frame has been drawn on canvas, to make the ball move//
var ballRadius = 10; //holds the radius of the drawn ball and is used for calculations//

//below is the function that will draw the ball on our canvas//
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); //this sets the x and y axis of ball, its radius and circumference, and starting angle, actually draws the circle of the ball//
    ctx.fillStyle = "#f56038" //color of the ball//
    ctx.fill();
    ctx.closePath();
    
}
// the below function clears the canvas, and calls for it to redraw the ball in a new position every 10 miliseconds//
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height); //this clears the canvas content after each frame is run so that you don't see the previous position of the ball//
    drawBall();
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;    // this formulates whether the ball has hit the left or right walls of the canvas, if so, it reverses the ball's direction//
        }
        if(y + dy > canvas.height-ballRadius  || y + dy < ballRadius) {
            dy = -dy;  //this formulates whether the ball has collided with the top or bottom of the canvas, and then reverses the ball's direction//
        }  //Both of the above if statements are our "collision detection"//
    
    x += dx;
    y += dy;

}
setInterval (draw, 10);