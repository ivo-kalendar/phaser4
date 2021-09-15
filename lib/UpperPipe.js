export default class Upperpipe extends Phaser.Sprite {
    constructor(game, downPipePosY) {
        super(game, game.width + 10, -200, "pipe");
        this.anchor.set(0.5);
        // this.y = this.game.height - this.height / 2;
        this.freePass = [
            downPipePosY - this.height - 100,
            downPipePosY - this.height - 300,
        ];
        this.y = Phaser.Math.between(...this.freePass);

        this.scale.setTo(0.2, 1);

        this.moveLeft();
    }

    restart() {
        // this.tween.start();
        if (this.tween2 === undefined || !this.tween2.isRunning) {
            this.x = this.game.width + 10;
            this.tween2 = this.game.add.tween(this);

            this.tween2.to(
                {
                    x: -this.game.width / 1.5,
                },
                5000 - this.game.width,
                Phaser.Easing.Exponential.Out.None,
                true
            );
        }
        if (this.tween) this.tween.stop();
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
        // console.log("moveing", this.width);
    }
}
