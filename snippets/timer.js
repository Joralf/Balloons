function create () {
  this.spawnBalloonTimer = this.time.addEvent({
    delay: 500,
    callback: spawnBalloon,
    callbackScope: this,
    loop: true
  });
}

function spawnBalloon () {
  ....

  this.balloons.add(balloon);
}
