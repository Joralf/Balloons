function update () {
  this.balloons.children.each((child) => {
    if (child.y < 0) {
      if (child.texture.key == this.currentBalloon) {
        this.scene.restart();
      }
      this.balloons.remove(child, true);
    }
  });
}
