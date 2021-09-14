export default class Bird extends Phaser.Sprite {
    constructor(game) {
        super(game, game.width / 5, game.height / 4, "bird");
        this.anchor.set(0.5);

        this.tween = this.game.add.tween(this);
        this.upTween = this.game.add.tween(this);
        // this.returnTween = this.game.add.tween(this);

        this.fallForever();
    }

    fallForever() {
        this.tween.to(
            { y: this.height / 2 + this.game.height },
            1000,
            Phaser.Easing.Exponential.Out.None,
            true
        );

        console.log(this.tween);

        // this.tween.repeat(1, 0);

        // this.tween.onComplete.add(() => {
        //     this.y = this.game.height / 4;
        //     // this.fallForever();
        //     console.log("completed");
        // });
    }

    jump() {
        // this.tween.pause();
        this.tween.stop();
        // this.upTween.stop();
        // this.returnTween.stop();

        console.log(this.tween.isRunning);

        // Jump Gravity Up

        // this.upTween.to(
        //     { y: this.y - 200 },
        //     500,
        //     Phaser.Easing.Exponential.Out.None,
        //     true
        // );
        this.tween.onComplete.addOnce(() => {
            console.group("Finished");
            this.tween.to(
                { y: this.height / 2 + this.game.height },
                1000,
                Phaser.Easing.Exponential.Out.None,
                true
            );
        }, this);
        // .onComplete.add(() => {
        //     this.returnTween.to(
        //         { y: this.y + 200 },
        //         500,
        //         Phaser.Easing.Exponential.Out.None,
        //         true
        //     );
        // });

        // this.returnTween.onComplete(() => {
        //     this.tween.resume();
        // });

        // // Jump Gravity Down
        // birdTween.onComplete.add(() => {
        //     // let tween = this.game.add.tween(this);
        //     // this.fallForever();
        //     this.tween.resume();

        //     // tween.to(
        //     //     { y: this.y + 200 },
        //     //     1000,
        //     //     Phaser.Easing.Exponential.Out.None,
        //     //     true
        //     // );
        // });
    }

    onStart() {
        console.log("starting");
    }

    onKeyPress() {
        this.spaceKey = this.game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );
        this.game.input.onDown.add(() => this.jump(), this);
        this.spaceKey.onDown.add(() => this.jump(), this);
    }
}
