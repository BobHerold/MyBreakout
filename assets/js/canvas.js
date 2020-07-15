var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");  // this variable is the actual tool that allows us to paint on the canvas//
var x = canvas.width/2;
var y = canvas.height -30;  // the x and y variables define a starting point for the ball at bottom center of the canvas//
var dx = 2;
var dy = -2;  //these variables add a small value to the x & y variables after every frame has been drawn on canvas, to make the ball move//
var ballRadius = 10; //holds the radius of the drawn ball and is used for calculations//

// below are our variables defining our racket to hit the ball with//
var racketHeight = 10;
var racketWidth = 75;
var racketX = (canvas.width-racketWidth) / 2;  // this gives the racket's starting point on the x axis//

// below are the control button's variables for the racket, set at false as they start out by not being pressed//
var rightPressed = false;
var leftPressed = false;
// information on our block variables; rows, colunms,padding between them, where they should start being drawn on the canva//
var blockRowCount = 3;
var blockColumnCount = 5;
var blockWidth = 75;
var blockHeight = 20;
var blockPadding = 10;
var blockOffsetTop = 30;
var blockOffsetLeft = 30;
var points = 0;
//below is a two-dimensional array containing our block columns, rows and the x and y positions to draw each block on the canvas as it loops thru the array//
var blocks = [];
for (var c=0; c<blockColumnCount; c++) {
    blocks[c] = [];
    for (var r=0; r<blockRowCount; r++) {
        blocks[c] [r] = { x: 0, y: 0, status: 1}; //the status will tell the code whether to redraw the block after a collision w/ball in function, collision detection//
    }
}

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
//below code is our collision detection for our blocks; if center of ball is within 4 coordinates of a block, block will break, ball will change direction, block will disappear//
function collisionDetection() {
    for (var c=0; c<blockColumnCount; c++) {
        for (var r=0; r<blockRowCount; r++) {
            var b = blocks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+blockWidth && y > b.y && y < b.y+blockHeight) {
                dy = -dy;
                b.status = 0;  
                points++;  // this will update our points each time status tellls us that a block has been broken//
                }
            }
        }
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
// below is the function that will draw our racket on the canvas//
function drawRacket() {
    ctx.beginPath();
    ctx.rect(racketX, canvas.height-racketHeight, racketWidth, racketHeight);
    ctx.fillStyle = "#12492f";
    ctx.fill();
    ctx.closePath();
}
//below is the code that will loop thru all the blocks in the array and draw them on the canvas in their correct positions//
function drawBlocks() {
    for(var c=0; c<blockColumnCount; c++) {
        for(var r=0; r<blockRowCount; r++) {
            if(blocks[c] [r].status ==1) { //this line checks status to see if block had a collision, it it's 1 then draw the block, 0 and it was hit by ball//
                var blockX = (c*(blockWidth+blockPadding)) +blockOffsetLeft; //this formula gives us the block's x position in each column//
                var blockY = (r*(blockHeight+blockPadding)) +blockOffsetTop; //this gives us the Y or height position of each block in each row//
                blocks[c] [r].x = blockX;
                blocks[c] [r].y = blockY;
                ctx.beginPath();
                ctx.rect(blockX, blockY, blockWidth, blockHeight);
                ctx.fillStyle = "#0a2f35";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// this function will track our points for each block that is broken, the 8, 20 parameters are the coordinates where this will be placed on the canvas//
function drawPoints() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0a2f35";
    ctx.fillText("Points: " +points, 8, 20);
}


// the below function clears the canvas, and calls for it to redraw the ball, blocks & racket in a new position every 10 miliseconds, also updates points on each frame//
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height); //this clears the canvas content after each frame is run so that you don't see the previous position of the ball//

    drawBlocks();
    drawBall();
    drawRacket();
    drawPoints();
    collisionDetection();
    
        if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;    // this formulates whether the ball has hit the left or right walls of the canvas, if so, it reverses the ball's direction//
        }
        if (y + dy < ballRadius) {
            dy = -dy;  //this formulates whether the ball has collided with the top if the canvas and then reverses the ball's direction//
        }  //Both of the above if statements are "collision detection"//
        else if(y + dy > canvas.height-ballRadius) {
            if(x > racketX && x < racketX + racketWidth) {  //this line is our collision detection between the ball and the racket, by checking to see if the center of the ball is between the racket width//
                dy = -dy;
            }
            else {
            alert("GAME HAS ENDED"); // this happens when the ball hits the bottom of the canvas and not the racket//
            document.location.reload();
            clearInterval(interval); //Needed for Chrome to end game//
            }
        }

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
 var interval = setInterval (draw, 10);