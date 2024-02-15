class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.gameActive = true;
    }

    preload() {
        this.load.image("background", "assets/road_resized.png");
        this.load.image("player", "assets/car_.png");
        this.load.image("enemy", "assets/enemy.png");
        this.load.image("obstacle", "assets/obstacle.png");
        this.load.spritesheet("caranim", "assets/car.png", {
            frameWidth: 200,
            frameHeight: 76,
        });

        //load sounds
        this.load.audio("EndMusic", "assets/gameover.mp3")
        this.load.audio("bgMusic", "assets/bgMusic.mp3")
        this.load.audio("rev", "assets/rev.mp3")
        // this.MenuMusic.stop()

    }

    create() {
        this.road = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background");
        this.road.setOrigin(0, 0);

        // Create player and set up physics
        this.player = this.physics.add.sprite(config.width / 2, config.height - 100, "player");
        this.player.setCollideWorldBounds(true);

        //make player bigger
        this.player.setScale(1.4)
        //change player hitbox
        this.player.body.setSize(60, 75);

        //create player animation
        this.anims.create({
            key:"turn-left",
            framerate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('caranim', {start: 0, end: 1}),
        })


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

         // add physics to obstacles-=[]
        this.obstacles = this.physics.add.group();

    // Spawn obstacles
        this.spawnObstacles();
        
    //initialize score 
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem("highScore")) || 0;
    this.scoreText = this.add.text(16, 16, `Score: ${this.score} High Score: ${this.highScore}`, { fontSize: '32px', fill: '#fff' });

    //create audio
    this.EndMusic = this.sound.add("EndMusic")
    this.rev = this.sound.add("rev")
    this.bgMusic = this.sound.add("bgMusic")
    this.bgMusic.play({ loop: true });
    }

    update(time, delta) {
        // Scroll the background
        if (this.gameActive){

            this.road.tilePositionY -= 5;
            // Smooth left and right movement
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-this.horizontalSpeed);
                // this.player.anims.play("turn-left", true);
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
                    this.rev.play()
        
                    // Set a short duration for the obstacle to stay stopped
                    this.time.delayedCall(Phaser.Math.Between(500, 1000), () => {
                        // After the short stop, resume the original random speed
                        obstacle.setVelocityY(Phaser.Math.Between(150, 400));
                        obstacle.setData('isStopped', false);
                        // Reset the timer for the next stop
                        obstacle.setData('stopTime', Phaser.Math.Between(2000, 3000));
                    }, null, this);
                }
            });
            //add collider for player and enemy
            this.physics.add.collider(this.player, this.obstacles, this.handleCollision, null, this);
        }

        //increase score
        this.increaseScore() 
    }

//spawn obstacles function
    spawnObstacles() {
        // Set up obstacle spawn timer
        this.obstacleSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 4000), // Randomize the delay for each spawn
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

    handleCollision(){
        this.bgMusic.stop()
        this.EndMusic.play();
        this.gameOver()
        this.scene.start("gameOverScene");
    }

    increaseScore() {
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score} High Score: ${this.highScore}`);
      }
    gameOver(){
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore); // Save high score to localStorage
          }
      
          // Display high score and score
          this.scoreText.setText(`Score: ${this.score} High Score: ${this.highScore}`);
      
    }
}
