export default class Bird extends Phaser.Sprite {
    constructor(game) {
        super(game, game.width / 5, game.height / 4, "bird");
        this.anchor.set(0.5);

        this.fallForever();
    }

    // startingPosition() {
    //     this.y = this.game.height / 4;
    //     this.x = this.game.width / 5;
    // }

    fallForever() {
        const fallSpeed = (this.game.height - this.y) * 4;
        // console.log("fall", fallSpeed);
        this.tween = this.game.add.tween(this);
        this.tween.to(
            {
                y: this.height / 2 + this.game.height,
            },
            fallSpeed,
            Phaser.Easing.Linear.None,
            true
        );

        this.tween.onComplete.addOnce(this.restart, this);
    }

    jump() {
        let jumpY = this.y - this.game.height / 8;
        if (this.tween2) this.tween2.stop();

        if (this.tween2 === undefined || !this.tween2.isRunning) {
            this.tween.stop();
            this.tween2 = this.game.add.tween(this);
            const y = this.y > 150 ? jumpY : this.height;
            this.tween2.to({ y }, 300, Phaser.Easing.Exponential.Out, true);

            this.tween2.onComplete.addOnce(this.fallForever, this);
        }
    }

    restart() {
        if (this.tween3 === undefined || !this.tween3.isRunning) {
            this.tween3 = this.game.add.tween(this);

            this.tween3.to(
                // { y: this.game.height / 4 },
                { y: 0 },
                10,
                Phaser.Easing.Linear.None,
                true
            );
            this.tween3.onComplete.addOnce(this.fallForever, this);
        }
        if (this.tween) this.tween.stop();
        if (this.tween2) this.tween2.stop();
    }

    onKeyPress() {
        this.spaceKey = this.game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR
        );
        this.game.input.onDown.add(() => this.jump(), this);
        this.spaceKey.onDown.add(() => this.jump(), this);
    }
}
