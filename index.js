window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;
  // these hard-coated values are executed here only once to minimise the frequent change of the color of the shape when multiple objects are made
  ctx.fillStyle = "white"; // hard-coated the color of the 'fill' method with white
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";

  class Player {
    constructor(game) {
      // game args so that the player knows the limitations of the width and height for easier movement
      this.game = game;
      // starting position of the player should be on the middle
      this.collisionX = this.game.width * 0.5; // to keep them in the middle of the canvas
      this.collisionY = this.game.height * 0.5;
      this.collisionRadius = 30;
    }

    draw(context) {
      context.beginPath(); // to start a new shape and close any previous shape if any
      context.arc(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        0,
        Math.PI * 2
      ); // used to draw a circle; expects 5 args; x,y coords for center point, radius, start angle in radians, end angle
      context.save();
      context.globalAlpha = 0.5; // sets the opacity of the shape to semi-transparent
      context.fill(); // default color is black ; used to fill color in the shape made
      context.restore();
      context.stroke(); // used to outline the shape made ; default is black, 1px stroke
    }
  } // movements and other things of the player

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
    }
    render(context) {
      // draw or update all objects
      this.player.draw(context);
    }
  } // controls our whole logic of the game

  const game = new Game(canvas);
  game.render(ctx);
  console.log(game);

  function animate() {} // animations of the game required
});
