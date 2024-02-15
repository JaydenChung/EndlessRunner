class Credit extends Phaser.Scene{
    constructor(){
        super('creditScene')
    }

    preload(){

    }

    create(){

        //credit config
        let creditConfig = {
            fontFamily: 'Courier New',
            fontSize: '30px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        const KeyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.KeyR = KeyR

        let credit = this.add.text(this.game.config.width/1.8, this.game.config.height/1.8, 
        'Credits:\n\n Car Sprite from senderin: https://senderin.itch.io/car \n\n All sound effects and music found on https://opengameart.org/ \n\n Artwork done by Jayden Chung on procreate\n\n Programming done by Jayden Chung\n\n',{
            fontSize: '12px',
            color: '#fff',
            backgroundColor: '#000000',
        }).setOrigin(0.5)
        
        
        this.add.text(game.config.width/2, game.config.height/1.2, 'Press "R" to go back to the menu', creditConfig).setOrigin(0.5);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.KeyR)){
            this.scene.start('menuScene')

        }

    }


}