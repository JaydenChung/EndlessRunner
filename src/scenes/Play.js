class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image("background", "assets/road_resized.png");
        this.load.image("player", "assets/car_.png");
        this.load.image("enemy", "assets/enemy.png");
        this.load.image("obstacle", "assets/obstacle.png")
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


        // Define lanes for obstacle spawning
        this.laneWidth = this.game.config.width / 3;
        this.lanes = [
            this.laneWidth / 2,
            this.laneWidth * 1.5,
            this.laneWidth * 2.5
        ];

         // Initialize the obstacles group without initial members
        this.obstacles = this.physics.add.group();

    // Spawn obstacles
        this.spawnObstacles();
        
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
        this.obstacles.getChildren().forEach(obstacle => {
            // Decrease the timer
            obstacle.data.values.stopTime -= delta;
    
            // Check if it's time to stop
            if (obstacle.data.values.stopTime <= 0 && !obstacle.data.values.isStopped) {
                obstacle.setVelocityY(0); // Stop the obstacle by setting its velocity to 0
                obstacle.setData('isStopped', true);
    
                // Set a short duration for the obstacle to stay stopped
                this.time.delayedCall(Phaser.Math.Between(500, 1000), () => {
                    // After the short stop, resume the original random speed
                    obstacle.setVelocityY(Phaser.Math.Between(150, 300));
                    obstacle.setData('isStopped', false);
                    // Reset the timer for the next stop
                    obstacle.setData('stopTime', Phaser.Math.Between(2000, 5000));
                }, null, this);
            }
        });
    }    


    spawnObstacles() {
        // Set up obstacle spawn timer
        this.obstacleSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000), // Randomize the delay for each spawn
            callback: () => {
                // Choose a random lane
                const laneIndex = Phaser.Math.Between(0, this.lanes.length - 1);
                const laneX = this.lanes[laneIndex];
    
                // Create an obstacle at the chosen lane
                const obstacle = this.obstacles.create(laneX, 0, 'enemy');
                // Set a random velocity for the obstacle
                const randomSpeed = Phaser.Math.Between(150, 400);
                obstacle.setVelocityY(randomSpeed);
    
                // Set a timer for when the obstacle should stop moving
                obstacle.setData('stopTime', Phaser.Math.Between(2000, 5000));
                obstacle.setData('isStopped', false);
            },
            callbackScope: this,
            loop: true
        });
    }
}