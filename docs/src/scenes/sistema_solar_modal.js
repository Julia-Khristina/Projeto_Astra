import config from '../global/config.js';
import Modal from '../components/modal.js';
import instrucaoModalSistema from '../mensagens/instrucao_sistema_solar_modal.js';

export default class SistemaSolarModal extends Phaser.Scene {

    constructor() {
        super("SistemaSolarModal");
    }

    preload() {
       this.load.image('sistema_solar', 'assets/images/Sistema_Solar.svg');
       this.load.image('pause',         'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.95, height * 0.90, 'pause').setScale(0.13).setInteractive();

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'SistemaSolarModal' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        // imagem do sistema solar exibida como plano de fundo da cena
        this.imagemSistemaSolar = this.add.image(width * 0.29, height * 0.51, 'sistema_solar').setScale(0.65);

        this.instrucaoModalSistema  = instrucaoModalSistema;
        this.indicePergunta         = 0;

        // modal posicionado à direita da imagem
        this.modalInstrucao = new Modal(this, width * 0.35, height * 0.69, width * 0.78, 2);

        this.mostrarInstrucao();

        this.events.on('atualizarFonte', () => {
            if (this.modalInstrucao && this.modalInstrucao.container && this.modalInstrucao.container.scene && this.modalInstrucao.container.visible) {
                this.mostrarInstrucao();
            }
        });
    }

    mostrarInstrucao() {
        const instrucaoAtual = this.instrucaoModalSistema[this.indicePergunta];

        const escala = config.fonteEscolhida || 1;
        instrucaoAtual.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;
        instrucaoAtual.estiloTitulo.wordWrap = { width: Math.round(800 * escala) };


        // ao confirmar, avança para a cena de perguntas
        instrucaoAtual.acao = () => {
            this.scene.start("Cena_Perguntas_Ua");
        };

        this.modalInstrucao.setPergunta(instrucaoAtual);
        this.modalInstrucao.show();
    }
}