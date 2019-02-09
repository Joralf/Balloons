function preload () {
  this.load.image('background', 'background.png');
}

function create () {
  this.background = this.add.image(0, 0, 'background').setOrigin(0, 0)
  this.background.displayHeight = this.game.config.height;
	this.background.displayWidth = this.game.config.width;
}
