import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var scaleRatio = window.devicePixelRatio / 3;


var game = new Phaser.Game(config);

function preload () {
  this.balloonTypes = ['redballoon', 'blueballoon', 'greenballoon']
  this.balloonTypes.forEach((balloon) => {
    this.load.image(balloon, `assets/${balloon}.png`);
  })
  this.balloonSize = 148 * window.devicePixelRatio / 3;

  // this.load.image('redballoon', 'assets/redballoon.png');
  // this.load.image('blueballoon', 'assets/blueballoon.png');
  // this.load.image('greenballoon', 'assets/green.png');
}

function create () {
  this.balloons = this.add.group({
    classType: Phaser.GameObjects.Sprite,
    active: true,
  });
  this.currentBalloon = 'redballoon';
  this.nextBalloon = 'blueballoon';
  this.score = 0;
  this.minX = this.balloonSize / 2;
  this.maxX = this.sys.game.canvas.width - this.minX;

  this.spawnBalloonTimer = this.time.addEvent({ delay: 2000, callback: spawnBalloon, callbackScope: this, loop: true });
  this.changeColorTimer = this.time.addEvent({ delay: 10000, callback: changeColor, callbackScope: this, loop: true});

  this.input.on('pointerdown', function(pointer){
    var touchX = pointer.x;
    var touchY = pointer.y;
    this.balloons.children.iterate(function(child) {
      if (child.getBounds().contains(touchX, touchY)) {
        updateScore(child, this);
        this.balloons.remove(child, true);
      }
    }, this)
   }, this);

   this.currentBalloonText = this.add.text(16, 16, this.currentBalloon, { fontSize: '32px', fill: '#fff' });
   this.nextBalloonText = this.add.text(16, 50, '(' + this.nextBalloon + ')', { fontSize: '32px', fill: '#fff' });
   this.scoreText = this.add.text(400, 16, this.score, { fontSize: '32px', fill: '#fff' })
}

function update () {
  this.balloons.children.iterate(function(child) {
    if (child.y < 0) {
      if (child.texture.key == this.currentBalloon) {
        console.log("you lose");
        this.scene.restart();
      }
      this.balloons.remove(child, true);
    }
  }, this)
}

function updateScore(balloon, game) {
  if (balloon.texture.key == game.currentBalloon) {
    game.score += 10;
  } else if (balloon.texture.key == game.nextBalloon) {
    game.score -= 5;
  } else {
    game.score -= 10;
  }

  game.scoreText.setText(game.score);
}

function spawnBalloon () {
  const randomBalloon = this.balloonTypes[ Math.floor( Math.random() * this.balloonTypes.length ) ];

  const randomX = Math.floor(Math.random() * (this.maxX - this.minX + 1)) + this.minX;

  let balloon = this.physics.add.sprite(randomX, 575, randomBalloon);
  balloon.setInteractive();
  balloon.body.setGravityY(-200);
  balloon.setScale(scaleRatio, scaleRatio);

  this.balloons.add(balloon);
}

function changeColor () {
  this.currentBalloon = this.nextBalloon;
  this.nextBalloon = this.balloonTypes[ Math.floor( Math.random() * this.balloonTypes.length ) ];
  this.currentBalloonText.setText(this.currentBalloon);
  this.nextBalloonText.setText('(' + this.nextBalloon + ')');

}
