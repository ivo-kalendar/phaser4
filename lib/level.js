import Bird from "./Bird.js";
import Pipe from "./Pipe.js";

export default class Level extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.game.load.image("bird", "./assets/bird.png");
        this.game.load.image("pipe", "./assets/pipe.png");
    }

    create() {
        this.view = this.game.add.group();

        this.bird = new Bird(this.game);
        this.pipe1 = new Pipe(this.game);
        this.pipe2 = new Pipe(this.game);

        this.view.add(this.bird);
        this.view.add(this.pipe1);
        this.bird.onKeyPress();
    }

    update() {
        if (this.pipe2.x < 0) this.view.remove(this.pipe2);
        if (this.pipe1.x < this.game.width / 3) {
            this.pipe2 = this.pipe1;
            this.pipe1 = new Pipe(this.game);
            this.view.add(this.pipe1);
        }
    }
}
