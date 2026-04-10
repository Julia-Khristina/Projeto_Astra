//importação da classe de instrução telescopio no mensagens, da classe modal e da classe slide.
import config from '../global/config.js';
import instrucaoTelescopio1  from '../mensagens/instrucao_telescopio1.js';
import Modal from '../components/modal.js';
import Slide from '../components/slide.js';
 
export default class Telescopio extends Phaser.Scene {
    constructor() {
        super({ key: 'Telescopio' });
    }
 
    preload() {
        this.load.image('pause',                'assets/images/botao_pause.svg');
        this.load.image('observatorio',         'assets/images/observatorio.png');
        this.load.image('telescopio',           'assets/images/telescopio.svg');
        this.load.image('astronauta-telescopio','assets/images/Astronauta_de_Costas.svg');
        this.load.image('cientista-telescopio', 'assets/images/cientista-costas.svg');
        this.load.image('direita',              'assets/images/seta_direita.png');
        this.load.image('esquerda',             'assets/images/seta_esquerda.png');
        this.load.image('cientista',            'assets/images/cientista-frente.svg');
        this.load.audio('audioTelescopio',      'assets/sounds/Audio_Telescopio.mp3');
    }
 
    create() {
        const { width, height } = this.scale;
 
        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive().setDepth(21);
 
        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //para todos os audio
            this.sound.pauseAll()
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Telescopio' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });
 
        //adição dos elementos, com as posições específicas, escala e ordem de aparecer na tela e interatividade.
        this.fundo      = this.add.image(width / 2,       height * 0.52, 'observatorio').setDisplaySize(width, height * 1.04).setDepth(-1).setVisible(true);
        this.telescopio = this.add.image(width * 0.47,    height * 0.50, 'telescopio').setScale(1.1).setVisible(true);
        this.astronauta = this.add.image(width * 0.16,    height * 0.83, 'astronauta-telescopio').setScale(0.3).setVisible(true);
        this.cientista  = this.add.image(width * 0.27,    height * 0.86, 'cientista-telescopio').setScale(0.3).setFlipX(true).setVisible(true);
        this.telescopio.disableInteractive();
 
        //adicionando todos os elementos da tela telescópio a um container, para colocar na função mostrarTelescopio para fazer setVisible de uma só vez.
        this.cenaTelescopio = this.add.container(0, 0, [this.fundo, this.telescopio, this.astronauta, this.cientista]);
 
        //adição do modal.
        this.modal = new Modal(this, width / 1.7, height / 1.7, 2, 2);
        this.modal.container.setDepth(20);
        this.modal.enableOverlay();
        //indice para o moval
        this.indicePergunta = 0;
        //variavel é igual a mensagem importada
        this.instrucaoTelescopio1 = instrucaoTelescopio1;
        //função para mostrar o modal.
        this.mostrarInstrucao();
 
        const textoSlide = 'POR QUE PRECISÁVAMOS SAIR DA TERRA?\n\nA ATMOSFERA DISTORCE A LUZ DAS ESTRELAS, DIFICULTANDO AS OBSERVAÇÕES.\n\nEM 1990, NASA E ESA LANÇARAM O HUBBLE A 600 KM DE ALTITUDE.\n\nPESA 11 TONELADAS, TEM ESPELHO DE 2,40 M E ORBITA A TERRA A CADA 95 MINUTOS.\n\nO ESPELHO FOI FABRICADO COM ERRO E AS IMAGENS SAÍAM BORRADAS.\n\nEM 1993, ASTRONAUTAS FORAM AO ESPAÇO E CORRIGIRAM O PROBLEMA.\n\nAPÓS O REPARO, SUA PRECISÃO SE TORNOU HISTÓRICA: ENXERGA UMA BOLA DE FUTEBOL A 51 KM.\n\nREVELOU O NASCIMENTO E A MORTE DE ESTRELAS.\n\nDETECTOU BURACOS NEGROS E FOTOGRAFOU MAIS DE 1.500 GALÁXIAS EM UMA ÚNICA IMAGEM.\n\nHOJE PASSA O BASTÃO AO JAMES WEBB, MAS SEU LEGADO MUDOU PARA SEMPRE A FORMA COMO A HUMANIDADE SE ENXERGA NO UNIVERSO.';

        //adicionando o slide com todos os elementos.
        this.slide = new Slide(
            this,
            width * 0.031,      // x
            height * 0.083,     // y
            width * 0.922,      // largura
            height * 0.833,     // altura
            32,                 // curva
            textoSlide,
            'TELESCÓPIOS',
            width * 0.10,       // xTexto
            height * 0.25,      // yTexto
            width * 0.65,       // yLimite (Wrap do texto)
            width * 0.5,        // xTitulo
            height * 0.18,      // yTitulo
            width * 0.75,       // xPlay (Direita)
            height * 0.81,      // yPlay (Y Direita)
            width * 0.18,       // xBotao (Esquerda)
            height * 0.795,      // yBotao (Y Esquerda - Alinhado)
            () => { 
                this.audioAtual = null;
                if (config.somAtivo) this.sound.stopByKey('audioTelescopio');
                this.slide.visivel(false); 
                this.mostrarTelescopio(true); 
                if(this.cientista2) this.cientista2.setVisible(false); 
            }, // Callback de encerramento
            width * 0.8
        );

        //configuração da personagem ser clicada.
        this.cientista.on('pointerdown', () => {
            //se ela for clicada vai deixar invisivel a cena antiga e começa uma cena de explicação.
            this.slide.visivel(true);
            this.audioAtual = 'audioTelescopio';
            if (config.somAtivo) this.sound.play('audioTelescopio', {volume: 0.5});
            this.mostrarTelescopio(false);
            this.telescopio.setInteractive();
            this.cientista2 = this.add.image(width * 0.91, height * 0.97, 'cientista').setScale(0.8).setDepth(11);
        });
 
        //configuração do telescopio ser clicado.
        this.telescopio.on('pointerdown', () => {
            //se clicar no telescopio muda a cena
            this.sound.stopAll();
            this.scene.start('Cena_zoom');
        });

        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible){
            this.mostrarInstrucao();
            }
            if (this.slide) {
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
            //declaração dos mensagens importados.
            const atual = this.instrucaoTelescopio1[this.indicePergunta];

            const escala = config.fonteEscolhida || 1;
            atual.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;
            atual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };

            atual.acao = () => {
                this.modal.hide(); 
                this.cientista.setInteractive(); 
            };
        
            //configuração do botão e para mostrar o modal.
            this.modal.setPergunta(atual);
            this.modal.show();
        }
            mostrarTelescopio(mostrar) {
            this.cenaTelescopio.setVisible(mostrar);
        }
}