import modal from '../components/modal.js';
import config from '../global/config.js';

export default class InicioExploracaoRecursos extends Phaser.Scene {
    constructor() {
        super({ key: 'InicioExploracaoRecursos' });
    }

    preload() {
        this.load.spritesheet('astronauta', 'assets/images/spritesheet_astronauta.png', {
            frameWidth: 200,
            frameHeight: 390,
        });
        this.load.image('nves',       'assets/images/nves.png');
        this.load.image('naveFogo',   'assets/images/nave.png');
        this.load.image('base',       'assets/images/base.png');
        this.load.image('fundoMarte', 'assets/images/fundo marte.png');
        this.load.image('pause',      'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive().setDepth(21);

        this.pause.on('pointerdown', () => {
            this.scene.launch('Pause', { cenaAnterior: 'InicioExploracaoRecursos' });
            this.scene.sleep();
        });

        this.add.image(width * 0.50, height * 0.50, 'fundoMarte').setScale(720 / 1080).setDisplaySize(width * 1.08, height * 1.08);
        this.nave = this.add.image(width * 0.26, height * 0.40, 'nves').setScale(0.46).setVisible(false);
        this.naveFogo = this.add.image(width * 0.26, height * -0.32, 'naveFogo').setScale(0.46).setAngle(-38);
        this.astronauta = this.add.sprite(width * 0.31, height * 0.80, 'astronauta').setScale(0.6).setVisible(false);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('astronauta', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.astronauta.setFrame(2);

        // Anima a nave descendo de fora da tela até a posição final, depois troca para nave parada e exibe o modal
        this.tweens.add({
            targets: this.naveFogo,
            y: height * 0.43,
            duration: 2000,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this.naveFogo.setVisible(false);
                this.nave.setVisible(true);
                this.astronauta.setVisible(true);
                this.modal.show();
            }
        });

        // Cria o modal mas não exibe ainda (será exibido após a nave pousar)
        this.modal = new modal(this, width * 0.47, height * 0.56, width * 0.70, height * 0.65);
        this.modal.container.setDepth(10);
        this.modal.setPergunta({
            titulo: '',
            descricao: 'EXPLORE A REGIÃO E ENCONTRE RECURSOS PARA AJUDAR OS HUMANOS A VIVER AQUI.',
            yDescricao: -(height * 0.14),
            yBotao: height * 0.09,
            textoBotao: 'ESTOU PRONTO (A)!',
            larguraBotao: width * 0.27,
            alturaBotao: height * 0.08,
            acao: () => {
                this.modal.hide();
                this.astronauta.setFlipX(true);
                this.astronauta.play('andar');
                this.tweens.add({
                    targets: this.astronauta,
                    x: -(width * 0.08),
                    duration: 3000,
                    ease: 'Linear',
                    onComplete: () => {
                        this.scene.start('ImersaoMarte');
                    }
                });
            }
        });


        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible) {
                this.modal.setPergunta({
                    titulo: '',
                    descricao: 'EXPLORE A REGIÃO E ENCONTRE RECURSOS PARA AJUDAR OS HUMANOS A VIVER AQUI.',
                    yDescricao: -(height * 0.14),
                    yBotao: height * 0.09,
                    textoBotao: 'ESTOU PRONTO (A)!',
                    larguraBotao: width * 0.27,
                    alturaBotao: height * 0.08,
                    acao: () => {
                        this.modal.hide();
                        this.astronauta.setFlipX(true);
                        this.astronauta.play('andar');
                        this.tweens.add({
                            targets: this.astronauta,
                            x: -(width * 0.08),
                            duration: 3000,
                            ease: 'Linear',
                            onComplete: () => {
                                this.scene.start('ImersaoMarte');
                            }
                        });
                    }
                });
                this.modal.show();
            }
        });
    }
}
