export default class Bird extends Phaser.Sprite {
    constructor(game) {
        super(game, game.width / 5, game.height / 4, "bird");
        this.anchor.set(0.5);

        this.birdDownTween = this.game.add.tween(this);
        this.repeatFall();
        this.gravity = 0;
    }

    repeatFall() {
        // if (this.birdDownTween === undefined) {
        // }
        this.birdDownTween = this.game.add.tween(this);

        this.birdDownTween.to(
            { y: this.height / 2 + this.game.height },
            1000,
            Phaser.Easing.Exponential.Out.None,
            true
        );

        // this.birdDownTween.onComplete.add(() => {
        //     this.y = this.game.height / 4;
        //     // this.repeatFall();
        //     console.log("completed");
        // });
    }

    jump() {
        console.log(this.y);
        let birdTween = this.game.add.tween(this);
        let fallForeverTween = this.game.add.tween(this);

        // Jump Gravity Up
        birdTween.to(
            { y: this.y - 200 },
            1000,
            Phaser.Easing.Exponential.Out.None,
            true
        );

        this.repeatFall();
        // Jump Gravity Down
        // birdTween.onComplete.add(() => {
        //     let birdDownTween = this.game.add.tween(this);

        //     birdDownTween.to(
        //         { y: this.y + 200 },
        //         1000,
        //         Phaser.Easing.Exponential.Out.None,
        //         true
        //     );
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
