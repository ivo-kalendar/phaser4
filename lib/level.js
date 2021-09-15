import Bird from "./Bird.js";
import Pipe from "./Pipe.js";
import UpperPipe from "./UpperPipe.js";

export default class Level extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.game.load.spritesheet(
            "bird",
            "./assets/witchSprite.png",
            64,
            45,
            6
        );
        this.game.load.image("pipe", "./assets/pipe.png");
    }

    create() {
        this.gameOver = false;
        this.colideDown = false;
        this.colideUp = false;

        this.points = 0;
        this.score = this.game.add.text(16, 16, `Score: ${this.points}`, {
            font: "Bold Arial",
            fill: "#f0f0f0",
            fontSize: "32px",
        });
        this.view = this.game.add.group();

        this.bird = new Bird(this.game);
        this.birdRestart = new Bird(this.game);
        this.pipe1 = new Pipe(this.game);
        this.pipe2 = new Pipe(this.game);
        this.upperPipe1 = new UpperPipe(this.game, this.pipe1?.y);
        this.upperPipe2 = new UpperPipe(this.game, this.pipe2?.y);

        this.witch = this.view.add(this.bird);
        this.anim = this.witch.animations.add("fly");
        this.anim.play(30, true);

        this.view.add(this.pipe1);
        this.view.add(this.upperPipe1);

        this.bird?.onKeyPress();
    }

    update() {
        this.theGameIsOver();
        this.checkColition();
        this.firstPipePass();
        this.secondPipePass();
    }

    firstPipePass() {
        if (!this.gameOver && this.pipe2 && this.pipe2?.x < 0) {
            this.points += 10;
            this.score.text = `Score: ${this.points}`;
            this.score.addColor("#009900", 7);
            this.pipe2.destroy();
            this.pipe2 = null;
            this.upperPipe2.destroy();
            this.upperPipe2 = null;
        }
    }

    secondPipePass() {
        if (!this.gameOver && this.pipe1?.x < this.game.width / 3) {
            this.pipe2 = this.pipe1;
            this.upperPipe2 = this.upperPipe1;
            this.pipe1 = new Pipe(this.game);
            // console.log(this.pipe1.y);
            this.upperPipe1 = new UpperPipe(this.game, this.pipe1.y);
            this.view.add(this.pipe1);
            this.view.add(this.upperPipe1);
        }
    }

    checkColition() {
        if (this.bird && this.pipe2) {
            this.colideDown = Phaser.Rectangle.intersects(
                this.bird.getBounds(),
                this.pipe2.getBounds()
            );
        }

        if (this.bird && this.upperPipe2) {
            this.colideUp = Phaser.Rectangle.intersects(
                this.bird.getBounds(),
                this.upperPipe2.getBounds()
            );
        }

        if (this.pipe2 && this.colideDown) {
            this.gameOver = true;
        }
        if (this.upperPipe2 && this.colideUp) {
            this.gameOver = true;
        }
    }

    theGameIsOver() {
        if (this.gameOver) {
            if (this.bird) {
                this.bird.restart();
            }

            if (this.pipe1 || this.upperPipe1) {
                this.pipe1.restart();
                this.upperPipe1.restart();
            }

            if (this.pipe2 || this.upperPipe2) {
                this.pipe2.destroy();
                this.pipe2 = null;
                this.upperPipe2.destroy();
                this.upperPipe2 = null;
            }
            this.restart();
        }
    }

    restart() {
        this.points = 0;
        this.score.setText("Game Over!");
        this.score.addColor("#f04040", 7);
        this.score.addColor("#f04040", 0);

        // this.score.fill = "#f04040";
        setTimeout(() => {
            this.score.setText(`Score: ${this.points}`);
            // this.score.fill = "#f0f0f0";
            this.score.addColor("#f0f0f0", 7);
            this.score.addColor("#f0f0f0", 0);
        }, 1000);

        this.gameOver = false;
    }
}
