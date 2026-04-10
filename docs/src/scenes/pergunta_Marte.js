import config from '../global/config.js';
import perguntaMarte from '../mensagens/instrucaoPerguntaMarte.js';
import Modal from '../components/modal.js';
import instrucaoCorretaMarte from '../mensagens/instrucaoCorretaMarte.js';
import instrucaoErradaMarte from '../mensagens/instrucaoErradaMarte.js';

export default class pergunta_Marte extends Phaser.Scene {

    constructor() {
        super("pergunta_Marte");
    }

    preload() {
        this.load.image('pause', 'assets/images/botao_pause.svg');
    }

    create() {
        //contante para responsividade
        const { width, height } = this.scale;

        //adição do botão de pause
        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive().setDepth(21);

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'pergunta_Marte' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        //declarações e indices para os modais
        this.listaPeguntas  = perguntaMarte;
        this.instrucaoCorretaMarte = instrucaoCorretaMarte;
        this.instrucaoErradaMarte = instrucaoErradaMarte;
        this.indicePergunta = 0;
        this.indiceCorreto = 0
        this.indiceErrado = 0

        // modal reutilizado para exibir todas as perguntas em sequência
        this.modalPergunta = new Modal(this, width * 0.70, height * 0.83, 2, 2);
        this.modalCorreto = new Modal(this, width * 0.70, height * 0.83, 2, 2);
        this.modalErrado = new Modal(this, width * 0.70, height * 0.83, 2, 2);

        //funções para os modais
        this.mostrarInstrucao();
        this.mostrarInstrucaoErrada();
        this.mostrarPergunta();

        //faz o atualizar fonte funcionar em todos os modais e funções
        this.events.on('atualizarFonte', () => {
        if (this.modalPergunta && this.modalPergunta.container && this.modalPergunta.container.scene && this.modalPergunta.container.visible) {
            this.mostrarPergunta();
        }
        if (this.modalCorreto && this.modalCorreto.container && this.modalCorreto.container.scene && this.modalCorreto.container.visible) {
            this.mostrarInstrucao();
            this.modalCorreto.show();
        }
        if (this.modalErrado && this.modalErrado.container && this.modalErrado.container.scene && this.modalErrado.container.visible) {
            this.mostrarInstrucaoErrada();
            this.modalErrado.show();
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

        //Após o fonteEscolhida ser mudado na tela de configuração a fontSize será mudada e a escala vai multiplicar o tamanho base do texto 
        perguntaAtual.estiloTitulo.fontSize = `${Math.round(80 * escala)}px`;
        perguntaAtual.estiloDescricao.fontSize = `${Math.round(45 * escala)}px`;
        perguntaAtual.estiloTitulo.wordWrap = { width: Math.round(1300 * escala) };

        this.modalPergunta.setPergunta({
            ...perguntaAtual,

            
            // valida a alternativa selecionada e exibe o feedback antes de avançar
            acaoCheck: () => {
                // se nenhuma alternativa foi selecionada, não faz nada
                if (this.modalPergunta.alternativaSelecionada === null) return;

                // guarda o índice da alternativa que o jogador clicou
                const selecionada = this.modalPergunta.alternativaSelecionada;

                // verifica se o índice clicado está dentro do array de corretas
                const acertou = perguntaAtual.correta.includes(selecionada);

                // usa o índice clicado para buscar diretamente qual instrução mostrar
                const indiceInstrucao = perguntaAtual.instrucoes[selecionada];

                this.time.delayedCall(2000, () => {

                    // esconde o modal da pergunta
                    this.modalPergunta.hide();

                    if (acertou) {
                        // define qual instrução correta vai ser exibida
                        this.indiceCorreto = indiceInstrucao;

                        // monta o modal com a instrução correta correspondente
                        this.mostrarInstrucao();

                        // exibe o modal de acerto
                        this.modalCorreto.show();

                    } else {
                        // define qual instrução errada vai ser exibida
                        this.indiceErrado = indiceInstrucao;

                        // monta o modal com a instrução errada correspondente
                        this.mostrarInstrucaoErrada();

                        // exibe o modal de erro
                        this.modalErrado.show();
                    }
                });
            },

            // avança direto para a próxima pergunta sem feedback
            acao: () => {
                this.modalPergunta.hide();
            }
        });

        this.modalPergunta.show();
    }

    // Navega para a cena final do jogo
    irParaFinal() {
        this.scene.start("");
    }

    // Exibe a instrução correta no modal, ajustando fonte conforme escala e define ação de continuação
    mostrarInstrucao() {
        const atual = this.instrucaoCorretaMarte[this.indiceCorreto];

        // Ajusta o tamanho da fonte e o limite de quebra de linha com base na escala escolhida
        const escala = config.fonteEscolhida || 1;
        atual.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;
        atual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };

        // Ao fechar o modal correto, inicia a cena de exploração de recursos
        atual.acao = () => {
            this.modalCorreto.hide();
            this.scene.start("InicioExploracaoRecursos");
        };

        this.modalCorreto.setPergunta(atual);
        this.modalCorreto.hide();
    }

    // Exibe a instrução de erro no modal, ajustando fonte conforme escala e define ação de retorno
    mostrarInstrucaoErrada() {
        const atual = this.instrucaoErradaMarte[this.indiceErrado];

        // Ajusta o tamanho da fonte e o limite de quebra de linha com base na escala escolhida
        const escala = config.fonteEscolhida || 1;
        atual.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;
        atual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };

        // Ao fechar o modal de erro, reexibe o modal de pergunta para nova tentativa
        atual.acao = () => {
            this.modalErrado.hide();
            this.modalPergunta.show();
        };

        this.modalErrado.setPergunta(atual);
        this.modalErrado.hide();
    }
}