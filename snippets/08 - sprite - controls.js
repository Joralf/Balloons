function create () {
  this.cursors = this.game.input.keyboard.createCursorKeys();
}

function update () {
  if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-250);
    this.player.scaleX(1);
  } else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(250);
    this.player.scaleX(-1);
  } else {
    this.player.body.setVelocityX(0);
  }
}
