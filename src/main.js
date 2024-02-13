let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 700,
    zoom: -1,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Load, Play]
}
let game = new Phaser.Game(config)
