function create () {
  this.balloon.setInteractive();
  this.balloon.on('pointerdown', (pointer) => {
    this.destroy();
  });
}
