function create () {
  this.background = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      'background'
  ).setOrigin(0,0);
}

function update () {
  const tileX = this.background.tilePositionX -= 0.50
  this.background.setTilePosition(tileX, 0);
}
