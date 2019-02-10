function create () {
  const centerX = this.game.config.width / 2;
  const centerY = this.game.config.height / 2;

  this.balloon = this.physics.add.sprite(centerX, centerY, 'redballoon');

  var scaleRatio = window.devicePixelRatio / 3;
  this.balloon.setScale(scaleRatio, scaleRatio);
}
