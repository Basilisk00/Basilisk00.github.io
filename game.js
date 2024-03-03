var birb;
var obstacle = [];

function startGame() {
    birb = new component(70,100, "https://github.com/Basilisk00/Basilisk00.github.io/blob/main/docs/assests/img/birb_cropped.png?raw=true", 210, 200, "image"); // First pair is coords, other pair of num is dimension of img
    myGameArea.start();
  }
  
  // Object that creates canvas 
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 480; // Canvas dimensions
      this.canvas.height = 550;
      this.context = this.canvas.getContext("2d"); // create drawing element
      document.body.insertBefore(this.canvas, document.body.childNodes[1]); // Place canvas as second element
      this.interval = setInterval(updateGameArea, 20); // Executes function every 20 millisecond
      this.frameNo = 0;

      // Gets keyboard input
      window.addEventListener('keypress', function(e) {
        myGameArea.key = e.code;
      })

      window.addEventListener('keyup', function (e) {
        myGameArea.key = false;
        stopMove();
      })
    },

    clear: function() {
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    },

    stop: function() {
      clearInterval(this.interval);
    }
  }

  // Component constructor
function component(width,height,color,x,y,type) {
  this.type = type;

  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;

  // Draws component again each frame
  this.update = function() {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    else {
      ctx.fillStyle =color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } 
  }

  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.crashWith = function(otherObj) {
    // Get dimensions of player component
    var left = this.x;
    var right = this.x + this.width;
    var top = this.y;
    var bottom = this.y + this.height;

    // Dimensions of object collided with
    var otherLeft = otherObj.x;
    var otherRight = otherObj.x + otherObj.width;
    var otherTop = otherObj.y;
    var otherBottom = otherObj.y + otherObj.height;

    var hasCrashed = true; // Assume crash by default

    // If player object is outside of otherObject bounds, it has not crashed

    if ((bottom < otherTop) ||(top > otherBottom) || (right < otherLeft) || (left > otherRight)) {
      hasCrashed = false;
    }

    return hasCrashed;
  }
}

function updateGameArea() {
  var x,y;
  // Checks all obstacles within array if player collides
  for (i = 0; i < obstacle.length; i++) {
    if (birb.crashWith(obstacle[i])) {
      myGameArea.stop();
      console.log("Failure");
    }
  }
    myGameArea.clear(); // Clears gameArea to prevent ghosting
    myGameArea.frameNo ++;
    // At first frame, or every 150th frame, generate new obstacle
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
      x = myGameArea.canvas.width;
      y= myGameArea.canvas.height;

      minHeight = 20;
      maxHeight = 300;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);

      minGap = 100;
      maxGap = 300;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

      obstacle.push(new component(10, height, "green", x, 0));  // Generates obstacles on top
      obstacle.push(new component(10, y - height - gap, "green", x, height + gap)); // Bottom obstacle
    }

    // Update all obstacles in array
    for (i = 0; i < obstacle.length; i++) {
      obstacle[i].x --;
      obstacle[i].update();
      
    }

  if (myGameArea.key === "Space") {
    birb.speedY = -1; 
  }
  birb.newPos();
  birb.update(); // Draws new birb after deletion
  //stopMove();
  
  
}

function everyinterval(n) {
  // If frame number is at current interval
  if ((myGameArea.frameNo / n) % 1 == 0) {
    //console.log ("Spwan obstacle");
    return true;
  }
  //console.log("Do not spawn");
  return false;
}

function goUp() {
  birb.speedY = -1;
}

function goDown() {
  birb.speedY = 1;
}

function goLeft(){
  birb.speedX = -1;
}

function goRight() {
  birb.speedX = 1;
}

function stopMove() {
  birb.speedX = 0;
  birb.speedY = 0;
}