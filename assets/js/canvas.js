var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");  // this variable is the actual tool that allows us to paint on the canvas//
var x = canvas.width/2;
var y = canvas.height -30;  // the x and y variables define a starting point for the ball at bottom center of the canvas//
var dx = 2;
var dy = -2;  //these variables give a small value to the x & y variables after every frame has been drawn on canvas, to make the ball move//
var ballRadius = 10; //holds the radius of the drawn ball and is used for calculations//

// below are our variables defining our racket to hit the ball with//
var racketHeight = 10;
var racketWidth = 75;
var racketX = (canvas.width-racketWidth) / 2;  // this gives the racket's starting point on the x axis//

// below are the control button's variables for the racket, set at false as they start out by not being pressed//
var rightPressed = false;
var leftPressed = false;

// the EventListeners below will tell us when buttons are pressed, allowing us to then run some code accordingly//
document.addEventListener ("keydown", keyDownHandler, false);
document.addEventListener ("keyup", keyUpHandler, false);

//function below will execute the code when a key is pressed down//
function keyDownHandler (e) {
    if (e.key == "Right"  || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
//function below will run code when a key is released//
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}



//below is the function that will draw the ball on our canvas//
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); //this sets the x and y axis of ball, its radius and circumference, and starting angle, actually draws the circle of the ball//
    ctx.fillStyle = "#f56038" //color of the ball//
    ctx.fill();
    ctx.closePath();
}
// below is the function that will draw our racket or paddle on the canvas//
function drawRacket() {
    ctx.beginPath();
    ctx.rect(racketX, canvas.height-racketHeight, racketWidth, racketHeight);
    ctx.fillStyle = "#12492f";
    ctx.fill();
    ctx.closePath();
}
// the below function clears the canvas, and calls for it to redraw the ball in a new position every 10 miliseconds//
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height); //this clears the canvas content after each frame is run so that you don't see the previous position of the ball//

    drawBall();
    drawRacket();
    
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;    // this formulates whether the ball has hit the left or right walls of the canvas, if so, it reverses the ball's direction//
        }
        if(y + dy > canvas.height-ballRadius  || y + dy < ballRadius) {
            dy = -dy;  //this formulates whether the ball has collided with the top or bottom of the canvas, and then reverses the ball's direction//
        }  //Both of the above if statements are our "collision detection"//

        if (rightPressed) {
            racketX += 7; //this will move our racket 7px to the right//
            if (racketX + racketWidth > canvas.width) {
                racketX = canvas.width - racketWidth; // this if statement keeps our racket from flying off the side of our canvas//
            }
        }
        else if (leftPressed) {
            racketX -= 7; //this moves our racket 7px to left on each frame rendering//
            if (racketX < 0) {
                racketX = 0;
            }

        }
    
    x += dx;
    y += dy;

}
setInterval (draw, 10);