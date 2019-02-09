function preload () {
  this.load.image('redballoon', 'redballoon.png');
}

function create () {
  const centerX = this.game.config.width / 2;
  const centerY = this.game.config.height / 2;

  this.balloon = this.physics.add.sprite(centerX, centerY, 'redballoon');
  this.balloon.setScale(scaleRatio, scaleRatio);

  this.balloon.body.setGravityY(-200);
}
