var config = {
    type: Phaser.AUTO,
    parent: 'id-of-container',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);
