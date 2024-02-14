class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("background", "assets/road_resized.png");
        this.load.image("player", "assets/car_.png");
    }

    create() {
        this.road = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background");
        this.road.setOrigin(0, 0);

        // Create player and set up physics
        this.player = this.physics.add.sprite(config.width / 2, config.height - 100, "player");
        this.player.setCollideWorldBounds(true);

        //make player bigger
        this.player.setScale(1.5)


        // Define controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Movement speed constants
        this.horizontalSpeed = 200;

        
    }

    update(time, delta) {
        // Scroll the background
        this.road.tilePositionY -= 5;
        

        // Smooth left and right movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.horizontalSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.horizontalSpeed);
        } else {
            this.player.setVelocityX(0);
        }
    }
}
