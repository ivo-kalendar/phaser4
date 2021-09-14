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
        let view = this.game.add.group();

        let bird = new Bird(this.game);
        let pipe = new Pipe(this.game);

        view.add(bird);
        view.add(pipe);
        bird.onKeyPress();
    }
}
