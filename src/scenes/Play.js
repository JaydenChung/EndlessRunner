class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("background", "assets/road.png");
        this.load.image("player", "assets/car_.png");
    }

    create() {
        this.road = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.road.setOrigin(0, 0);

        // Create player and set up physics
        this.player = this.physics.add.sprite(config.width / 2, config.height - 100, "player");
        this.player.setCollideWorldBounds(true);

        // Set the camera to follow the player
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // Define controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Movement speed constants
        this.horizontalSpeed = 200;
        this.verticalSpeed = 300;
    }

    update(time, delta) {
        // Move the road and player to create the endless effect
        this.road.tilePositionY -= this.verticalSpeed * delta * 0.001;
        this.player.y -= this.verticalSpeed * delta * 0.001;

        // Smooth left and right movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.horizontalSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.horizontalSpeed);
        } else {
            this.player.setVelocityX(0);
        }

        // Update the camera position if needed to keep the player in view
        this.cameras.main.scrollY = this.player.y - config.height + 100;
    }
}
