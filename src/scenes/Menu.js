class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
  
    preload() {
      // Load the menu image
      this.load.image("menuImage", "assets/menu.png");
      //load menu music
      this.load.audio("MenuMusic", "assets/MenuMusic.wav")
    }
  
    create() {
      // Display the menu image
      this.MenuMusic = this.sound.add("MenuMusic")
      this.MenuMusic.play()
      const menuImage = this.add.image(0, 0, "menuImage").setOrigin(0, 0);
  
      // Scale the menu image to fit the screen
      menuImage.displayWidth = this.game.config.width;
      menuImage.displayHeight = this.game.config.height;
  
      // Add text instructions

      this.add.text(this.game.config.width-100, 150, 'Traggic Traffic', {
        fontSize: '62px',
        fill: '#FF0000',
        align: 'center'
      }).setOrigin(1, 0);
  
      this.add.text(this.game.config.width - 20, 20, 'How to Play', {
        fontSize: '32px',
        fill: '#fff',
        align: 'right'
      }).setOrigin(1, 0);
  
      this.add.text(this.game.config.width - 20, 70, 'Use the arrow keys to move', {
        fontSize: '24px',
        fill: '#fff',
        align: 'right'
      }).setOrigin(1, 0);

      this.add.text(this.game.config.width - 200, 500, 'Press the spacebar to start', {
        fontSize: '24px',
        fill: '#fff',
        align: 'center'
      }).setOrigin(1, 0);
  
  
      // Start the game on spacebar press
      this.input.keyboard.on("keydown-SPACE", () => {
        this.MenuMusic.stop()
        this.scene.start("playScene");
      });
    }
}