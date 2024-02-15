class Gameover extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }
    preload(){
        this.load.image('gameOver', 'assets/obstacle.png')
    }
    create(){
        //displaygameover
        const gameOverImage = this.add.image(0, 0, 'gameOver');
        //scale
        gameOverImage.displayWidth = this.game.config.width;
        gameOverImage.displayHeight = this.game.config.height;

        //create R key for update
        const KeyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.KeyR = KeyR
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.KeyR)){
            this.scene.start('menuScene')

        }
    }
}
