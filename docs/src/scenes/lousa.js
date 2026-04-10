import instrucaoLousa from '../mensagens/instrucao_lousa.js';
import Modal from '../components/modal.js';
import Slide from '../components/slide.js';
import config from '../global/config.js';

export default class Lousa extends Phaser.Scene {

    constructor() {
        super({ key: 'Lousa' });
    }

    preload() {
        this.load.image('direita',   'assets/images/seta_direita.png');
        this.load.image('esquerda',  'assets/images/seta_esquerda.png');
        this.load.image('cientista', 'assets/images/cientista-frente.svg');
        this.load.image('pause',     'assets/images/botao_pause.svg');
        this.load.audio('instrucao', 'assets/sounds/Primeira_instrucao.mp3');
    }

    create() {
        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive().setDepth(21);

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //para todos os audio
            this.sound.pauseAll()
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Lousa' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        this.input.setTopOnly(false);


        this.add.image(width * 0.94, height * 0.97, 'cientista').setScale(0.8).setDepth(11);

        const textoSlide = 'BIG BANG\n\nO QUE FOI: O SURGIMENTO DO PRÓPRIO ESPAÇO-TEMPO A PARTIR DE UM PONTO MENOR QUE UM ÁTOMO.\nRESULTADO: O UNIVERSO ESFRIOU, PERMITINDO QUE A "SOPA" DE PARTÍCULAS FORMASSE OS PRIMEIROS GASES (HIDROGÊNIO E HÉLIO).\n\nAS PRIMEIRAS ESTRELAS\n\nO QUE FOI: A GRAVIDADE ESPREMEU NUVENS DE GÁS DE HIDROGÊNIO ATÉ ELAS "ACENDEREM", SURGINDO AS PRIMEIRAS ESTRELAS.\nIMPORTÂNCIA: FUNCIONARAM COMO FÁBRICAS QUÍMICAS, CRIANDO ELEMENTOS COMO CARBONO E OXIGÊNIO (ESSENCIAIS PARA A VIDA).\n\nVIA LÁCTEA E GALÁXIAS\n\nO QUE FOI: AGRUPAMENTOS MASSIVOS DE ESTRELAS QUE SE ATRAÍRAM.\nFORMAÇÃO: A VIA LÁCTEA SE FORMOU HÁ 13 BILHÕES DE ANOS, CRESCENDO AO "ENGOLIR" GALÁXIAS MENORES ATÉ VIRAR UMA ESPIRAL.\n\nSURGIMENTO DO SISTEMA SOLAR\n\nO QUE FOI: HÁ 4,6 BILHÕES DE ANOS, UMA NUVEM DE POEIRA ESTELAR COLAPSOU.\nRESULTADO: O SOL NASCEU NO CENTRO, E OS RESTOS DE POEIRA AO REDOR COLIDIRAM PARA FORMAR OS PLANETAS, INCLUINDO A TERRA (INICIALMENTE UMA BOLA DE FOGO DERRETIDA).\n\nORIGEM DA VIDA\n\nO QUE FOI: A TERRA ESFRIOU, CRIANDO OCEANOS E UMA ATMOSFERA PRIMITIVA.\nO SALTO: HÁ 3,8 BILHÕES DE ANOS, MOLÉCULAS SIMPLES SE TORNARAM AUTORREPLICANTES, GERANDO AS PRIMEIRAS BACTÉRIAS.';

        this.slide = new Slide(
            this,
            width * 0.03,      // x
            height * 0.08,     // y
            width * 0.92,      // largura
            height * 0.83,     // altura
            32,                 // curva
            textoSlide,
            'BIG BANG E A ORIGEM DO UNIVERSO',
            width * 0.10,       // xTexto
            height * 0.32,      // yTexto
            width * 0.65,       // yLimite (Wrap do texto)
            width * 0.5,        // xTitulo
            height * 0.22 - (config.fonteEscolhida - 1) * 60,     // yTitulo
            width * 0.75,       // xPlay (Direita)
            height * 0.81,      // yPlay
            width * 0.18,       // xBotao (Esquerda)
            height * 0.795,     // yBotao
            () => {this.audioAtual = null; this.sound.stopAll(); this.scene.start("Cena_linha_tempo");},  // para o audio e vai para a novaCena
            width * 0.8  
        );

        this.modal = new Modal(this, width / 2, height / 2, 2, 2);
        this.instrucaoLousa = instrucaoLousa;
        this.indicePergunta = 0;
        this.mostrarInstrucao();

        this.events.on('atualizarFonte', () => {
            const escala = config.fonteEscolhida || 1;
            
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible){
            this.mostrarInstrucao();
            }
            if (this.slide) {
            this.slide.tituloObj.setPosition(width * 0.5, height * 0.22 - (escala - 1) * 60);
            this.slide.atualizarTamanho();
            }
        });

        //evento de após o pause, a cena "acorda"
        this.events.on('wake', () => {
            // se o som ativo estiver ativo
            if (config.somAtivo) {
                //ele retoma todos os sons que estavam pausados
                this.sound.resumeAll();
                //verifica se o áudio está tocando
                const som = this.sound.get(this.audioAtual);
                 // se houver um áudio registrado e ele não estiver tocando, inicia novamente
                if (this.audioAtual && (!som || !som.isPlaying)) {
                    this.sound.play(this.audioAtual, { volume: 0.5 });
                }
            }
        });
    }

    mostrarInstrucao() {
        const atual = this.instrucaoLousa[this.indicePergunta];

        const escala = config.fonteEscolhida || 1;
        atual.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;
        atual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };

        atual.acao = () => {
            this.modal.hide();
            this.slide.visivel(true);
            this.audioAtual = 'instrucao';
            if (config.somAtivo) {
                this.sound.play('instrucao', {volume: 0.5});
        }
        };

        this.modal.setPergunta(atual);
        this.modal.show();
    }
}