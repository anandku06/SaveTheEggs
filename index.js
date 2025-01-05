window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  class Player {
    constructor(game) {
      // game args so that the player knows the limitations of the width and height for easier movement
      this.game = game;
      this.x
      this.y
    }

    draw(context){
        context.beginPath() // to start a new shape and close any previous shape if any
        context.arc(400, 500, 50, 0, Math.PI * 2) // used to draw a circle; expects 5 args; x,y coords for center point, radius, start angle in radians, end angle
        context.fill()
    }
  } // movements and other things of the player

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
    }
    render(context){ // draw or update all objects
        this.player.draw(context)
    }
  } // controls our whole logic of the game

  const game = new Game(canvas)
  game.render(ctx)
  console.log(game);

  function animate() {} // animations of the game required
});
