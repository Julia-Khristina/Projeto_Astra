export default class Chegada_terra extends Phaser.Scene {
    constructor() {
        super({ key: 'Chegada_terra' });
    }

    preload() {
        this.load.image('terra', 'assets/images/terra.png');
        this.load.image('nave',  'assets/images/nave.png');
        this.load.image('pause', 'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.95, height * 0.90, 'pause').setScale(0.13).setInteractive();

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Chegada_terra' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        this.add.image(width * 0.39, height * 0.14, 'terra').setOrigin(0, 0);

        this.nave = this.add.image(0, 0, 'nave').setScale(0.18);
        this.nave.angle = 90;

        this.tweens.add({
            targets: this.nave,
            x: width * 0.44,
            y: height * 0.64,
            duration: 2000,
            ease: 'Sine.easeInOut',
        });

        this.tweens.add({
            targets: this.nave, 
            angle : 260,
            duration: 1000,
            delay: 1000,
            ease: 'Sine.easeInOut',
            //unica parte que eu alterei para conectar com a tela das perguntas
            onComplete: () => {
                // Chama a próxima cena após o giro
                this.scene.start('Descida_Terra'); 
            }
        });
    }
}