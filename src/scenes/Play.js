class Play extends Phaser.Scene{
    constructor() {
        super("playScene")
    }
    create() {
        // this.addEventListener.text(20, 20, "Endless Runner Play")
        this.map = this.add.image(0, 0, 'map').setOrigin(0)

        let scaleX = this.cameras.main.width / this.map.width;
        let scaleY = this.cameras.main.height / this.map.height;

        // Use the smaller of the two scale factors to scale the image
        let scale = Math.min(scaleX, scaleY);

        // Scale the map image
        this.map.setScale(scale);

         // Optionally, you might want to center the image if it doesn't take up the full screen
         if (this.map.displayWidth < this.cameras.main.width) {
            this.map.x = (this.cameras.main.width - this.map.displayWidth) / 2;
        }
        if (this.map.displayHeight < this.cameras.main.height) {
            this.map.y = (this.cameras.main.height - this.map.displayHeight) / 2;
        }

        //create player car parameters(scene, x, y, key, frame, direction)
        this.car = new Car(this, 200, 150, 'player', 0, 'up')
        
    }

    preload(){
        //load audio here 4 at least 
        // this.preload.audio('')

    }

}