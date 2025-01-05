window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  class Player {
    constructor(game) {
      // game args so that the player knows the limitations of the width and height for easier movement
      this.game = game;
    }
  } // movements and other things of the player

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.player = new Player(this);
    }
  } // controls our whole logic of the game

  const game = new Game(canvas)
  console.log(game);

  function animate() {} // animations of the game required
});
