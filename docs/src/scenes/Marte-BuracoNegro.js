import config from '../global/config.js';
import ChuvaMeteoros from './ChuvaMeteoros.js';
import perguntaspt3 from '../mensagens/perguntaspt3.js';
import { iniciarCicloPerguntas } from '../mensagens/ciclo_de_perguntas.js';
import Modal from '../components/modal.js';
import sistemaVidas from '../components/SistemaVidas.js';

export default class Marte_BuracoNegro extends ChuvaMeteoros {
    constructor() {
        super("Marte_BuracoNegro");
    }

    create() {
        //contante para responsividade
        const { width, height } = this.scale;

        //declara a intrução pergunta3
        this.perguntaspt3 = perguntaspt3;
        //indice com valor inicial 0 para seguir uma lógica de array
        this.indicePergunta = 0;

        // instancia o modal
        this.modal = new Modal(this, width * 0.70, height * 0.83, 2, 2);

        // garante que o modal esteja no topo
        if (this.modal.container) {
            this.modal.container.setDepth(100);
        } else {
            this.modal.setDepth(100);
        }

        //implementação das vidas
        this.vidas = new sistemaVidas(this, 2);

        // aguarda o aviso de vidas ser fechado antes de iniciar a chuva
        this.events.once('vidasPronto', () => {
            this.indicePergunta = 0;
            super.create();
            // timer de 30 segundos para mudar de tela
            this.timerFinal = this.time.delayedCall(30000, () => {
                if (this.modal.container.visible) {
                    this.tempoEsgotado = true;
                } else {
                    this.irParaFinal();
                }
            });
        });

        //garante que o evento de atualizarFonte esteja nesta cena
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
        if (this.jogoAtivo && this.indicePergunta < this.perguntaspt3.length) {
            this.mostrarPergunta();
        }
        // sem perguntas restantes: perde vida direto
        else if (this.indicePergunta >= this.perguntaspt3.length) {
            this.vidas.perderVida();
        }
    }

    mostrarPergunta() {
        const { width } = this.scale;
        const atual = this.perguntaspt3[this.indicePergunta];
        this.pararChuva();

        //Declara escala como o valor 1 do config.fonteEscolhida
        const escala = config.fonteEscolhida || 1;
        //Após o fonteEscolhida ser mudado na tela de configuração o fontSize será mudada e a escala vai multiplicar o tamanho base do texto 
        atual.estiloTitulo.fontSize = `${Math.round(60 * escala)}px`;
        atual.estiloDescricao.fontSize = `${Math.round(40 * escala)}px`;
        // Ajustado para ser proporcional à largura da tela
        atual.estiloTitulo.wordWrap = { width: Math.round(width * 0.85) };

        this.modal.setPergunta({
            ...atual,
            // Verifica a resposta ao clicar no botão de confirmar
            acaoCheck: () => {
                // Ignora se nenhuma alternativa foi selecionada
                if (this.modal.alternativaSelecionada === null) return;

                // Perde uma vida se a alternativa selecionada estiver errada
                if (!atual.correta.includes(this.modal.alternativaSelecionada)) {
                    this.vidas.perderVida();
                }

                // Mostra se acertou ou errou
                this.modal.apresentarFeedback(atual.correta);

                // Trava cliques repetidos enquanto o feedback é exibido
                if (this.modal.travarAlternativas) this.modal.travarAlternativas();

                // Espera o feedback ser lido, fecha o modal e avança para a próxima pergunta
                this.time.delayedCall(2000, () => {
                    this.modal.hide();
                    if (this.timerFinal) this.timerFinal.paused = false;
                    if (this.tempoEsgotado) {
                        this.irParaFinal();
                        return;
                    }
                    this.indicePergunta++;
                    this.comecarChuva();
                });
            },
            // Fecha o modal e reinicia a chuva sem verificar resposta
            acao: () => {
                this.modal.hide();
                if (this.timerFinal) this.timerFinal.paused = false;
                if (this.tempoEsgotado) {
                    this.irParaFinal();
                    return;
                }
                this.comecarChuva();
            }
        });

        // Exibe o modal de pergunta na tela
        if (this.timerFinal) this.timerFinal.paused = true;
        this.modal.show();
    }

    // Encerra o ciclo de perguntas e navega para a cena de parabéns
    irParaFinal() {
        console.log("Todas as perguntas respondidas! Missão cumprida.");
        this.scene.start("cenaParabenizacao"); 
    }
}