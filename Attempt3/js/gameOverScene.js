class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }


    
    create() {
        // Display game over text.
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'Game Over', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        // Add a restart game button.
        const restartButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Restart', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(0.5);
        
        restartButton.on('pointerdown', () => {
            // Restart the game by starting the MainScene.
            this.scene.start('MainScene');
        });

        // Add a back to welcome screen button.
        const backButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'Back to Welcome', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .setOrigin(0.5);
        
        backButton.on('pointerdown', () => {
            // Go back to the welcome screen.
            this.scene.start('BootScene');
        });
    }
}
