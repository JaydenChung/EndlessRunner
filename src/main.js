var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    zoom: 1.1,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    },
    scene: [Menu, Play, Gameover, Credit] 
}
var game = new Phaser.Game(config)

let keyR;
let keyC;
