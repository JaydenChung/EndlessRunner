class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene")
    }
    create(){
        //create menu
        let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
        //display timer

    }
        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ENDLESS RUNNER', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
    }
    update(){
        // if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
        //     game.settings = {
        //         //bike speed
        //         //car speed
        //         //score
        //         //timer
        //     }
        //     this.sound.play('sfx_select')
        //     this.scene.start('playScene')   
        // }
    }
}

