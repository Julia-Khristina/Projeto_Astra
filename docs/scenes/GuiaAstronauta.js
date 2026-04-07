import modal from '../components/modal.js';
import config from '../global/config.js';
import instrucaoGuiaAstronauta from '../mensagens/instrucao_guia_astronauta.js';
// Cena do Guia: apresenta o mapa com a base, o cientista e a NASA,
import Slide from '../components/slide.js';
// permitindo o astronauta se mover ao clicar nos elementos necessarios.
export default class GuiaAstronauta extends Phaser.Scene{
    constructor() {
        super({ key: 'GuiaAstronauta' });
    }
    //carrega as imagens estáticas e o sprisheet do astronauta
    preload() {
        this.load.image('nves',      'assets/images/nves.png');
        this.load.image('pause',     'assets/images/botao_pause.svg');
        this.load.image('direita',   'assets/images/seta_direita.png');
        this.load.image('esquerda',  'assets/images/seta_esquerda.png');
        this.load.image('base',      'assets/images/base.png');
        this.load.image('nasa',      'assets/images/nasa.svg');
        this.load.image('fundo',     'assets/images/fundo_terra.svg');
        this.load.image('caminho',   'assets/images/caminho.png');
        this.load.image('cientista', 'assets/images/cientista-frente.svg');
        this.load.audio('comeco',     'assets/sounds/Comecar_instrucao.mp3');
        this.load.audio('astrofisica', 'assets/sounds/Introducao_astrofisica.mp3');
        this.load.spritesheet('astronauta', 'assets/images/spritesheet_astronauta.png', {
            frameWidth: 200,
            frameHeight: 390,
        });
    }

// Monta o cenário: fundo, caminho, base, NASA, nave, cientista e astronauta.
    create() {
        this.audioAtual = 'comeco';
        if (config.somAtivo) {
                this.sound.play('comeco', {volume: 0.5});
        }

        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.90, height * 0.17, 'pause').setScale(0.13).setInteractive().setDepth(100);

        this.slide = new Slide(this, width * 0.03, height * 0.08, width * 0.92, height * 0.83, 32, 
            ['SOU A ASTROFISICA DOROTHY, E IREI GUIÁ-LÓ EM SUA PROXIMA MISSÃO.\n\nPARA SEGUIR ADIANTE CLIQUE NA BASE DA NASA!\n\nESTOU LOGO ATRAS DE VOCÊ.'],
            ['SEJA BEM VINDO À TERRA!'],
            width * 0.11, height * 0.4, width * 0.65, height * 0.88, width * 0.14, width * 0.75, height * 0.86, 90, 90, () => {this.slide.visivel(false); this.mostrarCenario(true); this.cientista2.setVisible(false); this.audioAtual = null; this.sound.stopAll();}, width * 0.8);
            
        // Fundo do cenário: imagem da Terra cobrindo toda a tela
        this.fundo = this.add.image(width * 0.50, height * 0.50, 'fundo').setDisplaySize(width, height).setDepth(-1);
        // Caminho entre a nave/base e a NASA
        this.caminho = this.add.image(width * 0.44, height * 0.69, 'caminho');
        // NASA: começa sem interatividade; é liberada após o diálogo com a cientista
        this.nasa = this.add.image(width * 0.80, height * 0.35, 'nasa').setScale(0.5);
        // Base de pouso do astronauta
        this.base = this.add.image(width * 0.13, height * 0.81, 'base').setScale(0.5);
        // Cientista: interativa desde o início para iniciar o diálogo
        this.cientista = this.add.image(width * 0.55, height * 0.63, 'cientista').setScale(0.2).setInteractive();
        // Nave pousada ao lado da base, com ângulo inicial zerado (sem inclinação)
        this.nave = this.add.image(width * 0.13, height * 0.51, 'nves').setScale(0.34);
        this.nave.angle = 0;
        // Sprite do astronauta posicionado próximo à nave
        this.astronauta = this.add.sprite(width * 0.31, height * 0.83, 'astronauta').setScale(0.6);
        // Carrega os modais no jogo
        this.modal = new modal(this, width * 0.78, height * 0.67, 2, 2);
        this.modal.container.setDepth(20);
        this.modal.enableOverlay();

        // Exibe instrução inicial antes da cena começar
        this.cientista.disableInteractive();
        this.mostrarInstrucao();
        this.modal.show();

        // Animação de caminhada usando frames 0 a 7 do sprisheet, em loop infinito
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers ('astronauta', {start: 0, end: 5}),
            frameRate: 7,
            repeat: -1   // -1= loop infinito
        });

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //para todos os audios
            this.sound.pauseAll()
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'GuiaAstronauta' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });
        
        //frame inicial do astronauta (parado)
        this.astronauta.setFrame(2);
        // Clique na cientista: astronauta caminha até ela, recebe intruções e libera a NASA.
        this.cena = this.add.container(0, 0, [this.fundo, this.caminho, this.cientista, this.base, this.nasa, this.nave, this.astronauta,]);

        this.cientista.on('pointerdown', () => {
            const destinoX = this.cientista.x + (width * 0.06);
            const destinoY = this.cientista.y;

            if (destinoX < this.astronauta.x) {
                this.astronauta.setFlipX(true);
            } else {
                this.astronauta.setFlipX(false);
            }
            this.astronauta.play('andar');
            this.tweens.add({
                targets: this.astronauta,
                x: destinoX,
                y: destinoY,
                duration: 2000,
        // Executado ao término do movimento: para a animação e exibe o diálogo com a cientista
                onComplete: () => {
                    this.sound.stopAll();
                    this.audioAtual = 'astrofisica';
                    if (config.somAtivo) {
                        this.sound.play('astrofisica', {volume: 0.5});
                    }
                    this.astronauta.setFlipX(true);
                    this.astronauta.anims.stop();
                    this.astronauta.setFrame(2);
                    // Imagem ampliada da cientista exibida dentro do painel de diálogo
                    this.cientista2 = this.add.image(width * 0.92, height * 0.97, 'cientista').setScale(0.8).setDepth(11);
                    this.slide.visivel(true); 
                    this.mostrarCenario(false);
                    this.nasa.setInteractive();
                }
            });
            
        });
        // Clique na NASA: astronauta caminha até ela
        this.nasa.on('pointerdown', () => {
            const destinoX = this.nasa.x - (width * 0.04);
            const destinoY = this.nasa.y + (height * 0.21);
        //Vira o astronauta na direção do destino
            if (destinoX < this.astronauta.x) {
                this.astronauta.setFlipX(true);
            } else {
                this.astronauta.setFlipX(false);
            }
            this.astronauta.play('andar');
            this.tweens.add({
                targets: this.astronauta,
                x: destinoX,
                y: destinoY,
                duration: 2000,
        // Demonstra o que acontecerá pós a conclusão do clique na Nasa
                onComplete: () => {
                    this.astronauta.anims.stop();
                    this.astronauta.setFrame(2);
                    this.sound.stopAll();
                    this.scene.start('Lousa');
                }
            });
        });

        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible) {
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
    const instrucaoAtual = instrucaoGuiaAstronauta[0];
    const escala = config.fonteEscolhida || 1;

    if (instrucaoAtual.estiloTitulo) instrucaoAtual.estiloTitulo.fontSize = `${Math.round(60 * escala)}px`;
    if (instrucaoAtual.estiloDescricao) instrucaoAtual.estiloDescricao.fontSize = `${Math.round(40 * escala)}px`;

    this.modal.setPergunta({
        ...instrucaoAtual,
        acao: () => {
            if (config.somAtivo) this.sound.stopByKey('comeco');
            this.modal.hide(); // hide() no lugar de destroy() evita erros futuros
            this.cientista.setInteractive();
        }
    });
        this.modal.show();
    }
    
        mostrarCenario(mostrar) {
            this.cena.setVisible(mostrar);
        }
}