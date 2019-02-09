function create () {
  this.balloons = this.add.group({});

  this.input.on('pointerdown', (pointer) => {
    const touchX = pointer.x;
    const touchY = pointer.y;

    this.balloons.children.each((child) => {
      if (child.getBounds().contains(touchX, touchY)) {
        this.balloons.remove(child, true);
      }
    });
  });
 }


 function spawnBalloon () {
   ..

   this.balloons.add(balloon);
 }
