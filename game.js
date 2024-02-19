var birb;
var image = new Image();
image.src = "https://github.com/Basilisk00/Basilisk00.github.io/blob/main/docs/assests/img/birb_cropped.png?raw=true";

function startGame() {
    myGameArea.start();
    birb = new player();
  }
  
  // Object that creates canvas 
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 550; // Canvas dimensions
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d"); // create drawing element
      document.body.insertBefore(this.canvas, document.body.childNodes[1]); // Place canvas as second element
    }
  }

  function player() {
  myGameArea.context.drawImage(image, 230, 240, 90, 130); // First pair is coords, other pair of num is dimension of img
    
  }

  
  