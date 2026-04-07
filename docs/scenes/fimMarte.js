import modal from '../components/modal.js';
import instrucaoFimMarte from '../mensagens/instrucao_fim_marte.js';

// Cena de encerramento da exploração em Marte.
// Exibe o cenário final com a nave e as bases, apresenta um modal de despedida
// e, ao confirmar, anima a nave decolando antes de redirecionar ao quiz final.
export default class fimMarte extends Phaser.Scene {
    constructor() {
        super({ key: 'fimMarte' });
    }

    // Carrega os assets visuais: fundo, nave (parada e com fogo), base marciana e base humana
    preload() {
        this.load.image('nves',       'assets/images/nves.png');
        this.load.image('naveFogo',   'assets/images/nave.png');
        this.load.image('fundoMarte', 'assets/images/fundo marte.png');
        this.load.image('baseHumana', 'assets/images/base humana.png');
    }

    create() {
        const { width, height } = this.scale;

        // Monta o cenário: fundo, nave parada, nave com propulsor (oculta), bases, do foguete e humana.
        this.add.image(width * 0.50, height * 0.50, 'fundoMarte').setScale(720 / 1080).setDisplaySize(width * 1.08, height * 1.08);
        this.nave = this.add.image(width * 0.26, height * 0.40, 'nves').setScale(0.46).setAngle(-1);
        this.naveFogo = this.add.image(width * 0.26, height * 0.45, 'naveFogo').setScale(0.46).setAngle(-38).setVisible(false);
        this.add.image(width * 0.73, height * 0.40, 'baseHumana').setScale(0.5);

        // Cria e exibe o modal de encerramento com mensagem e botão de confirmação
        this.modal = new modal(this, width * 0.47, height * 0.28, width * 0.70, height * 0.78);
        this.modal.container.setDepth(10);
        this.modal.setPergunta({
            ...instrucaoFimMarte[0],
            acao: () => {
                // Ao confirmar: oculta modal, troca nave parada pela nave com fogo
                // e anima a decolagem para cima antes de iniciar o quiz final
                this.modal.hide();
                this.nave.setVisible(false);
                this.naveFogo.setVisible(true);
                this.tweens.add({
                    targets: this.naveFogo,
                    y: height * -0.32,           // move a nave para fora da tela (acima)
                    duration: 2000,
                    ease: 'Cubic.easeIn',
                    onComplete: () => {
                        this.scene.start('Marte_BuracoNegro');
                    }
                });
            }
        });
        this.modal.show();
    }
}
