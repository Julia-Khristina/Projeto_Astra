import config from '../global/config.js';
import instrucaoTutorial from '../mensagens/instrucao_tutorial.js';
import Modal from '../components/modal.js';

export default class PrimeiroTutorial extends Phaser.Scene {

    constructor() {
        super("PrimeiroTutorial");
    }
    preload() {
        this.load.image('pause', 'assets/images/botao_pause.svg');
    }
    create() {
        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.95, height * 0.90, 'pause').setScale(0.13).setInteractive();
        this.instrucaoTutorial  = instrucaoTutorial;
        this.indicePergunta     = 0;

        // modal que exibe a instrução antes de iniciar o tutorial
        this.modalInstrucao = new Modal(this, width * 0.51, height * 0.55, 2, 2);

        this.mostrarInstrucao();
        
        this.events.on('atualizarFonte', () => {
            // Mudou de 'this.modal' para 'this.modalInstrucao' e adicionou o '.scene'
            if (this.modalInstrucao && this.modalInstrucao.container && this.modalInstrucao.container.scene && this.modalInstrucao.container.visible) {
                this.mostrarInstrucao();
            }
        });
    }

    mostrarInstrucao() {
        const instrucaoAtual = this.instrucaoTutorial[this.indicePergunta];

        const escala = config.fonteEscolhida || 1;
        instrucaoAtual.estiloTitulo.fontSize = `${Math.round(70 * escala)}px`;
        instrucaoAtual.estiloDescricao.fontSize = `${Math.round(45 * escala)}px`;
        instrucaoAtual.estiloTitulo.wordWrap = { width: Math.round(1000 * escala) };

        // ao confirmar, avança para a cena do tutorial
        instrucaoAtual.acao = () => {
            this.scene.start("Tutorial");
        };

        this.modalInstrucao.setPergunta(instrucaoAtual);
        this.modalInstrucao.show();
    }
}