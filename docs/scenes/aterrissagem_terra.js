export default class Aterrissagem_terra extends Phaser.Scene {
    constructor() {
        super({ key: 'Aterrissagem_terra' });
    }
 
    preload() {
       //carregamento dos personagens, elementos e cenário.
        this.load.image('nave',    'assets/images/nave.png');
        this.load.image('base',    'assets/images/base.png');
        this.load.image('nasa',    'assets/images/Nasa.svg');
        this.load.image('fundo',   'assets/images/fundo_terra.svg');
        this.load.image('caminho', 'assets/images/caminho.png');
        this.load.image('guia',    'assets/images/cientista-frente.svg');
        this.load.image('pause',   'assets/images/botao_pause.svg');
    }
 
    create() {
        const { width, height } = this.scale;
 
        this.pause = this.add.image(width * 0.90, height * 0.17, 'pause').setScale(0.13).setInteractive().setDepth(100);
 
        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Aterrissagem_terra' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });
 
        //adição dos elementos, com as posições específicas, escala e ordem de aparecer na tela.
        this.add.image(width / 2,        height / 2,        'fundo').setDisplaySize(width, height).setDepth(-1);
        this.add.image(width * 0.44,     height * 0.69,     'caminho');
        this.add.image(width * 0.80,     height * 0.35,     'nasa').setScale(0.5);
        this.add.image(width * 0.13,     height * 0.81,     'base').setScale(0.5);
        this.nave = this.add.image(width * 0.13, height * 0.06, 'nave').setScale(0.34);
        this.guia = this.add.image(width * 0.55, height * 0.63, 'guia').setScale(0.2);
 
        //angulação da nave.
        this.nave.angle = -38;
 
        //animação da nave aterrissando.
        this.tweens.add({
            targets: this.nave,
            //posição final da nave.
            y: height * 0.54,
            //duração da animação.
            duration: 2000,
            //Quint.easeOut é o modelo de animação, ou seja, uma queda desacelerada.
            ease: 'Quint.easeOut',
            //quando a animação é completada, a tela é trocada para a próxima.
            onComplete: () => {
                this.scene.start('GuiaAstronauta');
            }
        });
    }
}
