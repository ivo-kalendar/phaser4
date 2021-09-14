import Level from "./level.js";

const game = new Phaser.Game(innerWidth, innerHeight, Phaser.CANVAS, "", {
    create,
});

function create() {
    this.stage.backgroundColor = 0x1d2d4d;
    // this.stage.backgroundColor = "rgb(50,80,90)";
    this.game.state.add("level", new Level());
    this.game.state.start("level");
}
