var birb;

function startGame() {
    myGameArea.start();
    birb = new component(90,130, "https://github.com/Basilisk00/Basilisk00.github.io/blob/main/docs/assests/img/birb_cropped.png?raw=true", 210, 200, "image"); // First pair is coords, other pair of num is dimension of img
  }
  
  // Object that creates canvas 
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 480; // Canvas dimensions
      this.canvas.height = 650;
      this.context = this.canvas.getContext("2d"); // create drawing element
      document.body.insertBefore(this.canvas, document.body.childNodes[1]); // Place canvas as second element
      this.interval = setInterval(updateGameArea, 20); // Executes function every 20 millisecond
    },
    clear: function() {
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
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
    console.log(this.speedX);
    this.y += this.speedY;
    //console.log(this.speedY);
  }

}

function updateGameArea() {
  myGameArea.clear(); // Clears gameArea to prevent ghosting
  //birb.x +=1;
  birb.newPos();
  birb.update(); // Draws new birb after deletion
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