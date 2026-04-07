// importa as classes de lógica Planeta e Terra
import config from '../global/config.js';

import { Planeta, Terra } from '../components/planeta.js';

import instrucaoSistema from '../mensagens/instrucao_sistema_solar.js'

import Modal from '../components/modal.js';


export default class Sistema_Solar extends Phaser.Scene {
    // construtor da cena
    constructor() {
        super({ key: 'Sistema_Solar' });
    }

    // carrega os assets da cena
    preload() {
        this.load.image('terra',    'assets/images/terra.png');
        this.load.image('venus',    'assets/images/venus.png');
        this.load.image('mercurio', 'assets/images/mercurio.png');
        this.load.image('sol',      'assets/images/sol.png');
        this.load.image('pause',    'assets/images/botao_pause.svg');
    }

    // Método onde os objetos são criados
    create() {
        const { width, height } = this.scale;

        this.pause = this.add.image(width * 0.95, height * 0.90, 'pause').setScale(0.13).setInteractive();

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Sistema_Solar' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        this.instrucaoSistema = instrucaoSistema;
        
        // guarda a posição vertical central da câmera
        const centerY = height / 2;

        // largura total da tela
        const w = width;
        
        // adiciona o Sol
        this.add.image(0, centerY, 'sol').setScale(height / 1080);

        // cria os planetas
        const xMercurio =  w * 0.35; const yMercurio = centerY - (height * 0.07);
        const mercurio = new Planeta(this,xMercurio, yMercurio,'mercurio'); // posição um pouco acima do centro
        
        const xVenus =  xMercurio + (w * 0.23); const yVenus = yMercurio + (height * 0.14);
        const venus = new Planeta(this, xVenus,yVenus,'venus'); // posição no centro vertical
        
        const xTerra =  xVenus + (w * 0.23); const yTerra = yVenus + (height * 0.14);
        const terra = new Terra(this, xTerra,yTerra, 'terra'); // abaixo do centro

        this.modal = new Modal(this, width * 0.41, height * 0.32, width * 0.78, height * 0.18, 0xffffff, 20);
        this.mostrarInstrucao();

        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible) {
                this.mostrarInstrucao();
            }
        });
    }


    mostrarInstrucao() {
        const atual = this.instrucaoSistema [0];

        const escala = config.fonteEscolhida || 1;
        atual.estiloTitulo.fontSize = `${Math.round(55 * escala)}px`;
        atual.estiloTitulo.wordWrap = { width: Math.round(900 * escala) };
        atual.estiloDescricao.fontSize = `${Math.round(38 * escala)}px`;
        atual.estiloDescricao.wordWrap = { width: Math.round(700 * escala) };

        this.modal.setPergunta(atual);
        
        if (this.modal.botaoAcaoGeral) {
            this.modal.botaoAcaoGeral.setVisible(false);
        }

        this.modal.show_slow();
    }

}