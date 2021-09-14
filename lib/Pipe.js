export default class Pipe extends Phaser.Sprite {
    constructor(game) {
        super(game, game.width + 10, 0, "pipe");
        this.anchor.set(0.5);
        // this.y = this.game.height - this.height / 2;
        this.pipePosY = [this.game.height + 240, this.game.height - 240];
        this.y = Phaser.Math.between(...this.pipePosY);

        this.scale.setTo(0.2, 1);

        this.moveLeft();
    }

    // this.upperPipe = this.view.create(0, 0, "pipe");

    moveLeft() {
        this.tween = this.game.add.tween(this);

        this.tween.to(
            {
                x: -this.game.width / 1.5,
            },
            5000 - this.game.width,
            Phaser.Easing.Exponential.Out.None,
            true
        );

        // this.tween.onComplete.addOnce(
        //     () => console.log(this.x, "pipe finished"),
        //     this
        // );
        console.log("moveing", this.width);
    }
}
