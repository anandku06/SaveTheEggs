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
      this.speedX = 0; // speed of the player along x-axis
      this.speedY = 0; // speed along y-axis
      this.dx = 0; // distance of the player from the mouse along  x-axis
      this.dy = 0; // distance along y-axis
      this.speedModifier = 5
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
      // wrapped the made changes between save() and restore() method to avoid sharing with other shapes
      context.stroke(); // used to outline the shape made ; default is black, 1px stroke

      context.beginPath();
      context.moveTo(this.collisionX, this.collisionY); // define the starting x and y coords of the line
      context.lineTo(this.game.mouse.x, this.game.mouse.y); // define the ending x and y coords of the line
      context.stroke(); // to make the line visible
    }

    update() {
      this.dx = this.game.mouse.x - this.collisionX; // one method for the player movement ; problem here is the speed is not constant
      this.dy = this.game.mouse.y - this.collisionY;

      const distance = Math.hypot(this.dy, this.dx) // other method for the player movement ; speed here is constant as we are targeting the longest distance only

      if(distance > this.speedModifier){
        this.speedX = this.dx / distance || 0; // makes the object move towards the mouse smoothly along x-axis
        this.speedY = this.dy / distance || 0; // makes the object move towards the mouse smoothly along y-axis
      } // to stop the vibration of the player
      else{
        this.speedX = 0
        this.speedY = 0
      }
      this.collisionX += this.speedX * this.speedModifier; 
      // adding the difference so that the object actually move
      this.collisionY += this.speedY * this.speedModifier; // multiplied by the speedModifier makes the player vibrate as now the player is pushed too far in both directions
    } // make the object (player) follow the mouse (line)
  } // movements and other things of the player

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };

      this.canvas.addEventListener("mousedown", (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = true;
        // coordinate of the click on the target node
        // console.log(this.mouse.x, this.mouse.y); // gives error because the 'this' keyword forgets its reference i.e. it forgets its lexical scoping
        // to overcome this using arrow functions
      });

      this.canvas.addEventListener("mouseup", (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = false;
      });

      this.canvas.addEventListener("mousemove", (e) => {
        if (this.mouse.pressed) {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
        }
      });
    }
    render(context) {
      // draw or update all objects
      this.player.draw(context);
      this.player.update();
    }
  } // controls our whole logic of the game

  const game = new Game(canvas);
  // console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // built-in method used to clear the shapes ; takes the starting coords and ending coords
    game.render(ctx); // because this is to be called again and again
    requestAnimationFrame(animate);
  } // animations of the game required

  animate();
});
