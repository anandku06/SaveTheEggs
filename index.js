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
      this.speedModifier = 5;
      this.spriteWidth = 255;
      this.spriteHeight = 255;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      this.frameX = 0;
      this.frameY = 5;
      this.image = document.getElementById("bull");
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );
      if (this.game.debug) {
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
    }

    update() {
      this.dx = this.game.mouse.x - this.collisionX; // one method for the player movement ; problem here is the speed is not constant
      this.dy = this.game.mouse.y - this.collisionY;
      const angle = Math.atan2(this.dy, this.dx); // Returns the angle (in radians) from the X axis to a point.
      if (angle < -2.74 || angle > 2.74) this.frameY = 6;
      else if (angle < -1.96) this.frameY = 7;
      else if (angle < -1.17) this.frameY = 0;
      else if (angle < -0.39) this.frameY = 1;
      else if (angle < 0.39) this.frameY = 2;
      else if (angle < 1.17) this.frameY = 3;
      else if (angle < 1.96) this.frameY = 4;
      else if (angle < 2.74) this.frameY = 5;

      console.log(angle);

      const distance = Math.hypot(this.dy, this.dx); // other method for the player movement ; speed here is constant as we are targeting the longest distance only

      if (distance > this.speedModifier) {
        this.speedX = this.dx / distance || 0; // makes the object move towards the mouse smoothly along x-axis
        this.speedY = this.dy / distance || 0; // makes the object move towards the mouse smoothly along y-axis
      } // to stop the vibration of the player
      else {
        this.speedX = 0;
        this.speedY = 0;
      }
      this.collisionX += this.speedX * this.speedModifier;
      // adding the difference so that the object actually move
      this.collisionY += this.speedY * this.speedModifier; // multiplied by the speedModifier makes the player vibrate as now the player is pushed too far in both directions
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 100;

      // horizonntal boundaries

      if (this.collisionX < this.collisionRadius) {
        this.collisionX = this.collisionRadius;
      } else if (this.collisionX > this.game.width - this.collisionRadius) {
        this.collisionX = this.game.width - this.collisionRadius;
      }

      // vertical boundaries4

      if(this.collisionY < this.game.topMargin + this.collisionRadius){
        this.collisionY = this.game.topMargin + this.collisionRadius
      }
      else if(this.collisionY > this.game.height - this.collisionRadius){
        this.collisionY = this.game.height - this.collisionRadius
      }

      // collision with obstacles
      this.game.obstacles.forEach((obstacle) => {
        let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollsion(
          this,
          obstacle
        );

        if (collision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;

          this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
      // when collision is detected with the obstacle then the player can't pass through it
    } // make the object (player) follow the mouse (line)
  } // movements and other things of the player

  class Obstacle {
    constructor(game) {
      this.game = game; // we got the access of all the game properties
      this.collisionX = Math.random() * this.game.width;
      this.collisionY = Math.random() * this.game.height;
      this.collisionRadius = 40;
      this.image = document.getElementById("obstacles");
      this.spriteWidth = 250;
      this.spriteHeight = 250;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 70;
      this.frameX = Math.floor(Math.random() * 4);
      this.frameY = Math.floor(Math.random() * 3);
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      ); // used to draw image on the canvas
      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
      }
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.topMargin = 260;
      this.debug = true;
      this.player = new Player(this);
      this.obstacles = [];
      this.numberOfObstacles = 10;
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
      window.addEventListener("keydown", (e) => {
        if (e.key == "d") this.debug = !this.debug;
      });
    }
    render(context) {
      // draw or update all objects
      this.obstacles.forEach((obstacle) => obstacle.draw(context));
      this.player.draw(context);
      this.player.update();
    }
    checkCollsion(a, b) {
      const dx = a.collisionX - b.collisionX;
      const dy = a.collisionY - b.collisionY;
      const distance = Math.hypot(dy, dx);
      const sumOfRadii = a.collisionRadius + b.collisionRadius;

      return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
    }
    init() {
      let attempts = 0;
      while (this.obstacles.length < this.numberOfObstacles && attempts < 500) {
        let testObstacle = new Obstacle(this);
        let overlapped = false;
        this.obstacles.forEach((obstacle) => {
          // using circle pack algo
          const dx = testObstacle.collisionX - obstacle.collisionX; // difference between the two obstacles horizontally
          const dy = testObstacle.collisionY - obstacle.collisionY; // difference between the two obstacles vertically
          const distance = Math.hypot(dx, dy);
          const distanceBuffer = 150; // minimum space for better movement of player between obstacles
          const sumOfRadii =
            testObstacle.collisionRadius +
            obstacle.collisionRadius +
            distanceBuffer;

          if (distance < sumOfRadii) {
            overlapped = true;
          }
        });
        const margin = testObstacle.collisionRadius * 3;
        if (
          !overlapped &&
          testObstacle.spriteX > 0 &&
          testObstacle.spriteX < this.width - testObstacle.width &&
          testObstacle.collisionY > this.topMargin + margin &&
          testObstacle.collisionY < this.height - margin
        ) {
          this.obstacles.push(testObstacle);
        }
        attempts++;
      }
    } // it will create obstacles and push them into the obstacle array
  } // controls our whole logic of the game

  const game = new Game(canvas);
  game.init();
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // built-in method used to clear the shapes ; takes the starting coords and ending coords
    game.render(ctx); // because this is to be called again and again
    requestAnimationFrame(animate);
  } // animations of the game required

  animate();
});
