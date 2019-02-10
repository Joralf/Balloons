function preload () {
  this.load.image('background', 'assets/background');
}

function create () {
  this.background = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      'background'
  ).setOrigin(0,0);
}
