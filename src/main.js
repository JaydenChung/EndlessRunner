// Jayden Chung
// Traggic Traffic
// 30 hours

// Creative Tilt
// simulated random movement of enemies to stop that simulate speeding with the scrolling background
// I was paticularly interested in keeping a highscore that would 
// remains across browser sessions that works similarly to an arcade game
// so I learned how to implement it with the localStorage API!

// I am paticularly proud of the art I drew for the game
// I just started drawing and originally didn't plan on
// making my own assets for the game 

// Note: I incredibly struggled finding the pixel coordinates of the spritesheet I was
// planning to use for animations. Because of this I could not calculate the proper
// frame height and width which didn't allow me to properly access the frames of the
// spritesheet. I commented out the code but the logic for adding animations for the player is there.
// The uncommented code will run a working animation but it is accessing some blank frames because
// the frame height and width of caranims are off :(

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    zoom: 1.1,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: true,
        }
    },
    scene: [Menu, Play, Gameover, Credit] 
}
var game = new Phaser.Game(config)

let keyR;
let keyC;
