import config from '../global/config.js';
import Carta from "../components/carta.js"; 
import Carta_Target from "../components/carta_target.js";
import Modal from "../components/modal.js";
import instrucaoLinha from "../mensagens/instrucao_cena_linha_tempo.js";

export default class Cena_linha_tempo extends Phaser.Scene {

    constructor() {
        super({ key: 'Cena_linha_tempo' });
        this.cartaoAtivo = 0; // índice do cartão que está aguardando uma carta
    }

    preload() {
        // assets visuais das cartas e do fundo dos modais
        this.load.image('Via_lactea_Galaxias',         'assets/images/Via_lactea_Galaxias.svg');
        this.load.image('Surgimento_do_sistema_solar', 'assets/images/Surgimento_do_sistema_solar.svg');
        this.load.image('Origem_da_vida',              'assets/images/Origem_da_vida.svg');
        this.load.image('Primeiras_estrelas',          'assets/images/Primeiras_estrelas.svg');
        this.load.image('Cartao',                      'assets/images/Modal_respostas.svg');
        this.load.image('pause',                       'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;
        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive();

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Cena_linha_tempo' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        // imagens associadas a cada carta, na ordem cronológica correta
        const listaImagens = [
            'Primeiras_estrelas',
            'Via_lactea_Galaxias',
            'Surgimento_do_sistema_solar',
            'Origem_da_vida'
        ];

        this.listaAcertos = [false, false, false, false]; // resultado de cada carta
        this.todasCorretas = 1; // 1 = acertou tudo; vira 0 ao encontrar qualquer erro
        this.cartaoAtivo = 0; // começa pelo primeiro cartão

        // cria os cartões de destino onde as cartas devem ser encaixadas
        this.grupoTargets = this.physics.add.group();
        this.listaCartasTarget = [];

        for (let i = 0; i < 4; i++) {
            let target = new Carta_Target(
                this, this.grupoTargets, 'Cartao',
                width * 0.16 + i * (width * 0.23),
                height * 0.75, i
            ); 
            target.criar();
            this.listaCartasTarget.push(target);
        }

        // cartas embaralhadas 
        this.grupoCartas = this.physics.add.group();
        this.listaCartas = [];

        const posicaoEmbaralhada = [3, 2, 0, 1]; // posição visual inicial de cada carta

        for (let i = 0; i < 4; i++) {
            let posAtual  = posicaoEmbaralhada[i];
            let carta = new Carta(
                this, this.grupoCartas, listaImagens[i],
                width * 0.16 + posAtual * (width * 0.23),
                height * 0.40, i
                // i = índice da carta na ordem cronológica
            );
            carta.criar();

            // cada carta responde ao clique individualmente
            carta.sprite.setInteractive();
            carta.sprite.on('pointerdown', () => this.selecionarCarta(carta));

            this.listaCartas.push(carta);
        }

        // destaca o primeiro cartão ativo
        this.ativarCartao(this.cartaoAtivo);

        this.instrucaoLinha = instrucaoLinha;

        // modal de instrução exibido no início da cena
        this.modalInstrucao = new Modal(this, width * 0.78, height * 0.19, 2, 100);
        this.mostrarModalInstrucao();

        // modal de feedback 
        this.modalFeedback = new Modal(this, width * 0.6, height * 0.45, 2, 200, 0xffffff, 32, 0);

        this.events.on('atualizarFonte', () => {
            if (this.modalInstrucao && this.modalInstrucao.container && this.modalInstrucao.container.scene && this.modalInstrucao.container.visible) {
                this.mostrarModalInstrucao();
            }
            if (this.modalFeedback && this.modalFeedback.container && this.modalFeedback.container.scene && this.modalFeedback.container.visible) {
                this.mostrarModalFeedback();
            }
        });

    }

    ativarCartao(indice) { 
        for (let i = 0; i < this.listaCartasTarget.length; i++) {
            const target = this.listaCartasTarget[i];
            if (i === indice) {
                target.sprite.setScale(0.8); // maior = destaque
            } else {
                target.sprite.setScale(0.7);
                target.sprite.clearTint();
            }
        }
    } 

    // chamado ao clicar em uma carta 
    // move ela para o cartao ativo
    selecionarCarta(carta) {
        if (this.cartaoAtivo >= 4) return; // todos os cartões já preenchidos

        const targetAtivo = this.listaCartasTarget[this.cartaoAtivo];
        if (targetAtivo.cartaOcupando) return; // cartao já ocupado, ignora

        // guarda posição original para poder devolver a carta se necessário
        carta.xOriginal = carta.xOriginal ?? carta.sprite.x;
        carta.yOriginal = carta.yOriginal ?? carta.sprite.y;

        targetAtivo.cartaOcupando = carta;  // marca o cartao como ocupado pela carta
        carta.indiceCartao = this.cartaoAtivo; // guarda em qual cartao a carta foi colocada

        // salva o índice do cartao antes do tween 
        const indiceDestino = this.cartaoAtivo;

        // anima a carta se movendo até o cartao de destino
        this.tweens.add({
            targets: carta.sprite,
            x: targetAtivo.sprite.x,
            y: targetAtivo.sprite.y,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                carta.sprite.disableInteractive(); // carta não pode ser clicada enquanto está no cartao

                // compara o índice correto da carta com o cartao onde foi colocada
                const acertou = carta.index === indiceDestino;
                this.listaAcertos[indiceDestino] = acertou;

                // clicar no cartao para retirar a carta
                targetAtivo.sprite.setInteractive();
                targetAtivo.sprite.off('pointerdown');
                targetAtivo.sprite.on('pointerdown', () => this.retirarCarta(targetAtivo));

                // avança para o próximo cartao vazio
                this.cartaoAtivo++;
                while (
                    this.cartaoAtivo < 4 &&
                    this.listaCartasTarget[this.cartaoAtivo].cartaOcupando
                ) {
                    this.cartaoAtivo++;
                }

                const todosOcupados = this.listaCartasTarget.every(t => t.cartaOcupando);

                if (!todosOcupados) {
                    this.cartaoAtivo = this.listaCartasTarget.findIndex(t => !t.cartaOcupando);
                    this.ativarCartao(this.cartaoAtivo);
                } else {
                    this.time.delayedCall(400, () => this.encerrarDesafio());
                }
            }
        });
    }

    // remove a carta do cartao e devolve a posição original
    retirarCarta(target) {
        if (this.cartaoAtivo >= 4) return;

        const carta = target.cartaOcupando;
        if (!carta) return;

        const indiceRetirado = carta.indiceCartao; // cartao de onde a carta está saindo

        // anima a carta voltando à posição original
        this.tweens.add({
            targets: carta.sprite,
            x: carta.xOriginal,
            y: carta.yOriginal,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                // reativa o clique da carta para poder selecioná-la novamente
                carta.sprite.setInteractive();
                carta.sprite.off('pointerdown');
                carta.sprite.on('pointerdown', () => this.selecionarCarta(carta));

                target.cartaOcupando = null;      // libera o cartao
                target.sprite.off('pointerdown'); // remove o listener de retirada
                this.listaAcertos[indiceRetirado] = false; // desfaz o acerto registrado

                //cartao liberado volta a ser o ativo
                this.cartaoAtivo = indiceRetirado;
                this.ativarCartao(this.cartaoAtivo);
            }
        });
    }
    
    // resultado final e feedback 
    encerrarDesafio() {
        // verifica se todas as cartas foram colocadas na posição correta
        this.todasCorretas = this.listaAcertos.every(a => a === true) ? 1 : 0;

        // verde = correto, vermelho = errado
        for (let i = 0; i < 4; i++) {
            if (this.listaAcertos[i]) {
                this.listaCartasTarget[i].sprite.setTint(0x00ff00);
            } else {
                this.listaCartasTarget[i].sprite.setTint(0xff0000);
            }
        }
        this.listaCartasTarget.forEach(t => t.sprite.setScale(0.7));
        this.mostrarModalFeedback();
    }

    // modal de instrução inicial + escala de fonte 
    mostrarModalInstrucao() {
        const instrucaoAtual = this.instrucaoLinha[0];
        const escala = config.fonteEscolhida || 1;

        instrucaoAtual.estiloTitulo.fontSize = `${Math.round(55 * escala)}px`;
        instrucaoAtual.estiloTitulo.wordWrap = { width: Math.round(2000 * escala) };

        // ao fechar o modal de instrução
        instrucaoAtual.acao = () => {
            this.modalInstrucao.hide();
        };

        this.modalInstrucao.setPergunta(instrucaoAtual);
        this.modalInstrucao.botaoAcaoGeral.setVisible(false); // botão oculto
        this.modalInstrucao.show();
    }

    // modal de feedback 
    mostrarModalFeedback() {
        this.modalInstrucao.hide();

        // índice 1 = feedback de erro, índice 2 = feedback de acerto
        const feedbackAtual = this.instrucaoLinha[this.todasCorretas + 1];
        const escala = config.fonteEscolhida || 1;

        // ajusta textos e botão a escala de fonte escolhida
        feedbackAtual.estiloTitulo.fontSize  = `${Math.round(60 * escala)}px`;
        feedbackAtual.estiloTitulo.wordWrap  = { width: Math.round(1200 * escala) };
        feedbackAtual.larguraBotao           = Math.round(240 * escala);
        feedbackAtual.alturaBotao            = Math.round(50 * escala);
        feedbackAtual.fontSizeBotao          = `${Math.round(40 * escala)}px`;

        feedbackAtual.acao = () => {
            this.modalFeedback.hide();
            this.time.delayedCall(300, () => {
                if (this.todasCorretas) {
                    this.scene.start("Telescopio"); // avança para a próxima cena
                } else {
                    this.scene.restart(); // reinicia a cena para nova tentativa
                }
            });
        };

        this.modalFeedback.setPergunta(feedbackAtual);
        this.modalFeedback.show_slow();
    }
}