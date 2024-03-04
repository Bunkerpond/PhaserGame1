class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.carriedBox = null; // Track the box being carried by the player.
    }

    preload() {
        // Preload images/sprites for the player, truck, and box.
        this.load.image('player', 'assets/images/workerpng.png'); // Load the player sprite
        this.load.image('background', 'assets/images/Background.png'); // Load the background image
        //this.load.image('truck', 'assets/images/truck.png');
        //this.load.image('box', 'assets/images/box.png');
        // Preload any other assets like sounds here.
    }

    create() {

        // Existing code to add the player
    this.player = this.physics.add.sprite(100, 100, 'player');

    // Enable physics world bounds collision for the player
    this.player.setCollideWorldBounds(true);

    // Optionally, set the game world bounds if you want them to be different from the default
    this.physics.world.bounds.width = this.sys.game.config.width;
    this.physics.world.bounds.height = this.sys.game.config.height;


    this.player = this.add.sprite(400, 300, 'player');


        // Assuming 'background' is the key for your loaded background image
    let background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    
    // Scale down the background to fit the game's canvas
    background.setScale(0.5); // Example: Scales the image to 50% of its original size

    // Alternatively, scale the background to fit the width and height of the game's canvas
    background.displayWidth = this.sys.game.config.width;
    background.displayHeight = this.sys.game.config.height;

        // Add the player
        this.player = this.physics.add.sprite(100, 100, 'player').setScale(0.1);
        this.player.setCollideWorldBounds(true);

        // Setup the game timer.
        this.initialTime = 30; // Example: 30 seconds for the timer.
        this.timeText = this.add.text(16, 16, 'Time: ' + this.initialTime, { fontSize: '32px', fill: '#000' });
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Interactable area for scanning boxes (simplified as a Phaser zone).
        this.scanArea = this.add.zone(700, 300, 50, 50).setRectangleDropZone(50, 50);
        this.scanArea.setData('isScanArea', true);
        this.add.graphics().lineStyle(2, 0xffff00).strokeRect(this.scanArea.x - 25, this.scanArea.y - 25, this.scanArea.input.hitArea.width, this.scanArea.input.hitArea.height);

        // Keyboard control for box interactions.
        // this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.interactKey.on('down', () => {
        //     if (this.carriedBox) {
        //         this.dropBox();
        //     } else {
        //         this.pickUpBox();
        //     }
        // });


    this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Reset player velocity to 0 every frame; player stops moving if no keys are pressed.
        this.player.body.setVelocity(0);
    
        // Adjust the player's velocity when an arrow key is pressed.
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(160);
        }
    
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(160);
        }
    }
    
    updateTimer() {
        this.initialTime -= 1; // Decrement the timer by 1 second.
        this.timeText.setText('Time: ' + this.initialTime);
        if (this.initialTime <= 0) {
            this.timer.remove(false);
            this.scene.start('GameOverScene'); // Transition to GameOverScene when time runs out.
        }
    }

    pickUpBox() {
        const box = this.boxes.getChildren().find(box => this.player.body.touching.none && Phaser.Math.Distance.Between(this.player.x, this.player.y, box.x, box.y) < 50);
        if (box) {
            this.carriedBox = box;
            box.setVisible(false); // Hide the box (or visually attach it to the player).
        }
    }

    dropBox() {
        if (this.carriedBox) {
            if (Phaser.Geom.Rectangle.Overlaps(this.scanArea.getBounds(), this.carriedBox.getBounds())) {
                console.log('Box scanned successfully!');
                // Implement effects or scoring for scanning the box here.
            }
            this.carriedBox.setVisible(true).setPosition(this.player.x, this.player.y); // Show and place the box.
            this.carriedBox = null;
        }
    }
}

