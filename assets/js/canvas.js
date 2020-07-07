var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");  // this variable is the actual tool that allows us to paint on the canvas//
var x = canvas.width/2;
var y = canvas.height -30;  // the x and y variables define a starting point for the ball at bottom center of the canvas//
var dx = 2;
var dy = -2;  //these variables give a small value to the x & y variables after every frame has been drawn on canvas, to make the ball move//

//below is the function that will draw the ball on our canvas//
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2); //this sets the x and y axis of ball, its radius and circumference, and starting angle//
    ctx.fillStyle = "#f56038" //color of the ball//
    ctx.fill();
    ctx.closePath();
    
}
// the below function clears the canvas, and calls for it to redraw the ball in a new position every 10 miliseconds//
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height); //this clears the canvas content after each frame is run so that you don't see the previous position of the ball//
    drawBall();
    x += dx;
    y += dy;

}
setInterval (draw, 10);