export default class Descida_Terra extends Phaser.Scene {

    constructor() {
        super({ key: 'Descida_Terra' });
    }

    preload() {
        this.load.image('terra', 'assets/images/terra.png');
        this.load.image('nave',  'assets/images/nave.png');
        this.load.image('pause', 'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive();

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Descida_Terra' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        // planeta posicionado na base da tela como cenário de fundo
        const imagemTerra = this.add.image(width * 0.47, height * 1.69, 'terra');
        imagemTerra.setScale(1.8);

        // nave começa no topo e desce em direção ao planeta
        this.imagemNave = this.add.image(width * 0.47, 0, 'nave').setScale(0.23);
        this.imagemNave.angle = -35;

        this.tweens.add({
            targets:  this.imagemNave,
            y: height * 0.49,
            duration: 1500,
        });

        // avança para a cena de aterrissagem após a animação concluir
        this.time.delayedCall(2500, () => {
            this.scene.start('Aterrissagem_terra');
        });
    }
}