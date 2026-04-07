export default class loop_marte extends Phaser.Scene {
    constructor() {
        super({ key: 'loop_marte' });
    }

    preload() {
       this.load.image('venus', 'assets/images/venus.png');
        this.load.image('nave',  'assets/images/nave.png');
    }

    create() {
        const { width, height } = this.scale;

        this.add.image(width * 0.39, height * 0.14, 'venus').setOrigin(0, 0);

        this.nave = this.add.image(0, 0, 'nave').setScale(0.18);
        this.nave.angle = 90;

        this.tweens.add({
            targets: this.nave,
            x: width * 0.32,
            y: height * 0.43,
            duration: 2000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                // Chama a próxima cena após o giro
                this.scene.start('RegioesMarte'); 
            }
        });

    }
}