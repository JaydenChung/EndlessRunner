class Load extends Phaser.Scene {
    constructor(){
        super('loadScene')
    }
    preload(){
        this.load.path = './assets/'
        this.load.spritesheet('player','car.png', {
            frameWidth: 68,
            frameHeight: 68,
        }) 
        this.load.image('map', 'road.png')
    }

    create(){
        //player animations
        this.anims.create({
            key: 'idle',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 20, end: 32}),
        })

        //jump to play after loading
        this.scene.start('playScene')
    }
}