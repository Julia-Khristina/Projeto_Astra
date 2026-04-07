import config from '../global/config.js';
import perguntas2 from '../mensagens/perguntaspt2.js';
import Modal from '../components/modal.js';
import sistemaVidas from '../components/SistemaVidas.js';

export default class Cena_Perguntas_Ua extends Phaser.Scene {

    constructor() {
        super("Cena_Perguntas_Ua");
    }

    create() {
        const { width, height } = this.scale;

        this.listaPeguntas  = perguntas2;
        this.indicePergunta = 0;

        this.vidas = new sistemaVidas(this);

        // modal reutilizado para exibir todas as perguntas em sequência
        this.modalPergunta = new Modal(this, width * 0.70, height * 0.83, 2, 2);

        // aguarda o modal de aviso do SistemaVidas ser fechado antes de começar
        this.events.once('vidasPronto', () => this.mostrarPergunta());

        this.events.on('atualizarFonte', () => {
            if (this.modalPergunta && this.modalPergunta.container && this.modalPergunta.container.scene && this.modalPergunta.container.visible) {
                this.mostrarPergunta();
            }
        });
    }

    mostrarPergunta() {
        // encerra o ciclo ao esgotar todas as perguntas
        if (this.indicePergunta >= this.listaPeguntas.length) {
            this.irParaFinal();
            return;
        }

        const perguntaAtual = this.listaPeguntas[this.indicePergunta];

        // recalcula o fontSize com o valor atual do config
        const escala = config.fonteEscolhida || 1;

        perguntaAtual.estiloTitulo.fontSize = `${Math.round(80 * escala)}px`;
        perguntaAtual.estiloDescricao.fontSize = `${Math.round(45 * escala)}px`;
        perguntaAtual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };

        this.modalPergunta.setPergunta({
            ...perguntaAtual,

            
            // valida a alternativa selecionada e exibe o feedback antes de avançar
            acaoCheck: () => {
                if (this.modalPergunta.alternativaSelecionada === null) return;

                if (!perguntaAtual.correta.includes(this.modalPergunta.alternativaSelecionada)) {
                    this.vidas.perderVida();
                }

                this.time.delayedCall(2000, () => {
                    this.modalPergunta.hide();
                    this.indicePergunta++;
                    this.mostrarPergunta();
                });
            },

            // avança direto para a próxima pergunta sem feedback
            acao: () => {
                this.modalPergunta.hide();
                this.indicePergunta++;
                this.mostrarPergunta();
            }
        });

        this.modalPergunta.show();
    }

    irParaFinal() {
        this.scene.start("fimTerra");
    }
}