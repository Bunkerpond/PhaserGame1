class bootscene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Preload any assets here. For example, images for the start button.
        this.load.image('startButton', 'assets/images/startButton.png');
    }

    create() {
        // Add the start button and make it interactive.
        let startButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'startButton').setInteractive();

        startButton.on('pointerdown', () => {
            // Transition to the MainScene when the start button is clicked.
            this.scene.start('MainScene');
        });

        // Optionally, add some text instructions or game title.
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'My Phaser Game', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
    }
}
