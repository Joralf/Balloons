function create () {
  this.player.animations.add('walk', [8, 9, 10, 11]);
  this.player.animations.add('stand', [0]);
}

function update () {
  if (Math.abs(this.player.body.velocity.x) > 0) {
    this.player.animations.play('walk', 10, true);
  } else {
    this.player.animations.play('stand', 10, true);
  }
}
