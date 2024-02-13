class Car extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.exisiting(this)

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)

        //set custom car properties
        this.direction = direction
        this.speed = 100

        scene.carFSM = new StateMachine('idle', {
            idle: new IdleState(),
            turn: new TurnState(),
            die: new DieState(),
            break: new BreakState(),
        }, [scene, this]) 
    }
}

class IdleState extends State {
    enter(scene, car) {
        car.setVelocity(0)
        car.anims.play()
    }
}