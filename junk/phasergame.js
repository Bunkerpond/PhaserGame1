class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        this.load.image("background", "junk/Backroupng");
        this.load.image("player", "Attempt3/Background.png"); // Corrected file path
    }

    create() {
        this.add.image(0, 0, "background").setOrigin(0, 0); // Corrected key
        this.player = this.physics.add.sprite(100, 100, "player");
        this.player.setCollideWorldBounds(true);
    }

    update() {
        if (this.player.y >= this.physics.world.bounds.height) {
            this.handleGameOver();
        }
    }

    handleGameOver() {
        this.scene.start('GameOverScene');
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" });
    }

    create() {
        this.add.text(100, 100, "Game Over", { fontSize: "40px" });

        const restartButton = this.add.text(100, 200, "Restart", { fontSize: "40px" });
        restartButton.setInteractive(); // Corrected method name
        restartButton.on("pointerdown", () => { // Corrected event name
            this.scene.start("GameScene"); // Corrected scene key
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene, GameOverScene],
    physics: { // Un-comment and correct this section
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
