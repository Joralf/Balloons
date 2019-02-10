import 'phaser';

const config = {
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

const scaleRatio = window.devicePixelRatio / 3;

const game = new Phaser.Game(config);

function preload () {
  this.balloonTypes = ['red', 'blue', 'green']
  this.balloonTypes.forEach((balloon) => {
    this.load.image(balloon, `assets/${balloon}balloon.png`);
  })

  this.load.image('background', 'assets/background.png');
}

function create () {
  this.currentBalloon = 'red';
  this.nextBalloon = 'green';
  this.score = 0;
  this.balloonSize = 148 * window.devicePixelRatio / 3;
  this.minX = this.balloonSize / 2;
  this.maxX = this.sys.game.canvas.width - this.minX;
  this.balloons = this.add.group({});

  this.cameras.main.setBackgroundColor('#fff')
  this.background = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height - 62,
      'background'
  ).setOrigin(0,0);

  this.spawnBalloonTimer = this.time.addEvent({ delay: 1000, callback: spawnBalloon, callbackScope: this, loop: true });
  this.changeColorTimer = this.time.addEvent({ delay: 5000, callback: changeColor, callbackScope: this, loop: true});

  this.input.on('pointerdown', (pointer) => {
    const touchX = pointer.x;
    const touchY = pointer.y;
    this.balloons.children.each((child) => {
      if (child.getBounds().contains(touchX, touchY)) {
        updateScore(child, this);
        this.balloons.remove(child, true);
      }
    })
   });

   this.currentBalloonLabel = this.add.text(10, this.sys.game.canvas.height - 60, 'Current: ', { fontSize: '24px', fill: '#333' });
   this.nextBalloonLabel = this.add.text(10, this.sys.game.canvas.height - 30, 'Next: ', { fontSize: '24px', fill: '#333' });
   this.currentBalloonText = this.add.text(130, this.sys.game.canvas.height - 60, this.currentBalloon, { fontSize: '24px', fill: this.currentBalloon });
   this.nextBalloonText = this.add.text(130, this.sys.game.canvas.height - 30, this.nextBalloon, { fontSize: '24px', fill: this.nextBalloon });
   this.countdownText = this.add.text(this.sys.game.canvas.width - 120, this.sys.game.canvas.height - 60, this.changeColorTimer.delay / 1000 - this.changeColorTimer.getElapsedSeconds(), { fontSize: '64px', fill: '#333' });
   this.scoreText = this.add.text(this.sys.game.canvas.width - 70, 10, this.score, { fontSize: '32px', fill: '#333' });
}

function update () {
  this.background.setTilePosition(this.background.tilePositionX -= 0.50, 0);

  this.balloons.children.each(function(child) {
    if (child.y < 0) {
      if (child.texture.key == this.currentBalloon) {
        this.scene.restart();
      }
      this.balloons.remove(child, true);
    }
  }, this)

  this.countdownText.setText((this.changeColorTimer.delay / 1000 - this.changeColorTimer.getElapsedSeconds()).toFixed(1));
}

function updateScore(balloon, game) {
  let scoreDelta;
  switch (balloon.texture.key ) {
    case game.currentBalloon:
      scoreDelta = +10;
      break;
    case game.nextBalloon:
      scoreDelta = -5;
      break;
    default:
      scoreDelta = -10;
      break;

  }
  game.score += scoreDelta
  game.scoreText.setText(game.score);

  // game.scoreText.setText(game.score + '(' + scoreDelta + ')');
}

function spawnBalloon () {
  const randomBalloon = this.balloonTypes[ Math.floor( Math.random() * this.balloonTypes.length ) ];

  const randomX = Math.floor(Math.random() * (this.maxX - this.minX + 1)) + this.minX;

  let balloon = this.physics.add.sprite(randomX, this.game.config.height - 150, randomBalloon);
  balloon.setInteractive();
  balloon.body.setGravityY(-200);
  balloon.setScale(scaleRatio, scaleRatio);

  this.balloons.add(balloon);
}

function changeColor () {
  this.currentBalloon = this.nextBalloon;
  this.nextBalloon = this.balloonTypes[ Math.floor( Math.random() * this.balloonTypes.length ) ];
  this.currentBalloonText.setText(this.currentBalloon);
  this.currentBalloonText.setFill(this.currentBalloon);
  this.nextBalloonText.setText(this.nextBalloon);
  this.nextBalloonText.setFill(this.nextBalloon);

}
