export default class Pipe extends Phaser.Sprite {
    constructor(game) {
        super(game, game.width / 1.5, 450, "pipe");
        this.anchor.set(0.5);
    }
}
