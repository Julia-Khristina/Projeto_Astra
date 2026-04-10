import modal from '../components/modal.js';
import instrucaoFimTerra from '../mensagens/instrucao_fim_terra.js';

// Cena de encerramento da exploração em Marte.
// Exibe o cenário final com a nave e as bases, apresenta um modal de despedida
// e, ao confirmar, anima a nave decolando antes de redirecionar ao quiz final.
export default class fimTerra extends Phaser.Scene {
    constructor() {
        super({ key: 'fimTerra' });
    }

    // Carrega os assets visuais: fundo, nave (parada e com fogo), base marciana e base humana
    preload() {
        this.load.image('nves',     'assets/images/nves.png');
        this.load.image('naveFogo', 'assets/images/nave.png');
        this.load.image('fundo',    'assets/images/fundo_terra.svg');
        this.load.image('caminho',  'assets/images/caminho.png');
        this.load.image('nasa',     'assets/images/nasa.svg');
        this.load.image('base',     'assets/images/base.png');
        this.load.image('pause',    'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;

        // Monta o cenário: fundo terra, caminho, nasa, base, nave parada e nave com propulsor (oculta).
        this.add.image(width * 0.50, height * 0.50, 'fundo').setDisplaySize(width, height).setDepth(-1);
        this.add.image(width * 0.44, height * 0.69, 'caminho');
        this.add.image(width * 0.80, height * 0.35, 'nasa').setScale(0.5);
        this.add.image(width * 0.13, height * 0.81, 'base').setScale(0.5);
        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive();
        this.nave = this.add.image(width * 0.13, height * 0.51, 'nves').setScale(0.34).setAngle(-1);
        this.naveFogo = this.add.image(width * 0.13, height * 0.54, 'naveFogo').setScale(0.34).setAngle(-38).setVisible(false);

        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'fimTerra' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        // Cria e exibe o modal de encerramento com mensagem e botão de confirmação
        this.modal = new modal(this, width * 0.47, height * 0.35, width * 0.70, height * 0.78);
        this.modal.container.setDepth(10);
        this.mostrarInstrucao();
        this.modal.show();

        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible) {
                this.mostrarInstrucao();
            }
        });
    }

    mostrarInstrucao() {
        this.modal.setPergunta({
            ...instrucaoFimTerra[0],
            acao: () => {
                // Ao confirmar: oculta modal, troca nave parada pela nave com fogo
                // e anima a decolagem para cima antes de iniciar o quiz final
                this.modal.hide();
                this.nave.setVisible(false);
                this.naveFogo.setVisible(true);
                this.tweens.add({
                    targets: this.naveFogo,
                    y: this.scale.height * -0.32,
                    duration: 2000,
                    ease: 'Cubic.easeIn',
                    onComplete: () => {
                        this.scene.start('Terra_Marte');
                    }
                });
            }
        });
    }
}