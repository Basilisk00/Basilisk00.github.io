var birb;

function startGame() {
    myGameArea.start();
  }
  
  // Object that creates canvas 
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 550;
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d"); // create drawing  element
      document.body.insertBefore(this.canvas, document.body.childNodes[7]);
    }
  }

  
  