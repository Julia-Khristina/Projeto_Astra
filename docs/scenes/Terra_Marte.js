import config from '../global/config.js';
import ChuvaMeteoros from './ChuvaMeteoros.js';
import perguntas from '../mensagens/perguntas.js';
import { iniciarCicloPerguntas } from '../mensagens/ciclo_de_perguntas.js';
import Modal from '../components/modal.js';
import sistemaVidas from '../components/SistemaVidas.js';

export default class Terra_Marte extends ChuvaMeteoros {
    constructor() {
        super("Terra_Marte");
    }

    create() {
        const { width, height } = this.scale;

        this.perguntas = perguntas;
        this.indicePergunta = 0;

        // instancia o modal
        this.modal = new Modal(this, width * 0.70, height * 0.83, 2, 2);

        // garante que o modal esteja no topo
        if (this.modal.container) {
            this.modal.container.setDepth(100);
        } else {
            this.modal.setDepth(100);
        }

        this.vidas = new sistemaVidas(this, 2);

        // aguarda o aviso de vidas ser fechado antes de iniciar a chuva
        this.events.once('vidasPronto', () => {
            this.indicePergunta = 0;
            super.create();
            // timer de 30 segundos para mudar de tela
            this.time.delayedCall(30000, () => {
                this.irParaFinal();
            });
        });

        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.visible) {
            this.mostrarPergunta();
            }
        });
    }

    aoColidir(nave, meteoro) {
        // destrói o meteoro imediatamente para evitar outras colisões
        meteoro.destroy(); 

        // jogo ativo e ainda existe perguntas na lista
        if (this.jogoAtivo && this.indicePergunta < this.perguntas.length) {
            this.mostrarPergunta();
        }
        // sem perguntas restantes: perde vida direto
        else if (this.indicePergunta >= this.perguntas.length) {
            this.vidas.perderVida();
        }
    }

    mostrarPergunta() {
        const { width } = this.scale;
        const atual = this.perguntas[this.indicePergunta];
        this.pararChuva();

        const escala = config.fonteEscolhida || 1;
        atual.estiloTitulo.fontSize = `${Math.round(60 * escala)}px`;
        atual.estiloDescricao.fontSize = `${Math.round(40 * escala)}px`;
        atual.estiloTitulo.wordWrap = { width: Math.round(width * 0.85) }; // Ajustado para ser proporcional à largura da tela

        this.modal.setPergunta({
            ...atual,
            acaoCheck: () => {
                if (this.modal.alternativaSelecionada === null) return;

                if (!atual.correta.includes(this.modal.alternativaSelecionada)) {
                    this.vidas.perderVida();
                }

                // mostra se acertou ou errou
                this.modal.apresentarFeedback(atual.correta);

                // trava cliques repetidos
                if (this.modal.travarAlternativas) this.modal.travarAlternativas();

                // espera o feedback ser lido e avança
                this.time.delayedCall(2000, () => {
                    this.modal.hide();
                    this.indicePergunta++;
                    this.comecarChuva();
                });
            },
            acao: () => {
                this.modal.hide();
                this.comecarChuva();
            }
        });

        this.modal.show();
    }

    irParaFinal() {
        console.log("Todas as perguntas respondidas! Missão cumprida.");
        this.scene.start("loop_marte"); 
    }
}