import Slide_Marte from '../components/slide_marte.js';
import config from '../global/config.js';

export default class RegioesMarte extends Phaser.Scene {
    constructor() {
        super({ key: 'RegioesMarte' });
    }

    preload() {
        //carregamento das imagens da cena
        this.load.image('mapa',     'assets/images/Mapa_Marte.svg');
        this.load.image('direita',  'assets/images/seta_direita.png');
        this.load.image('esquerda', 'assets/images/seta_esquerda.png');
        this.load.image('branco',   'assets/images/Bola_Branca.svg');
        this.load.image('laranja',  'assets/images/Bola_Laranja.svg');
        this.load.image('ciano',    'assets/images/Bola_Ciano.svg');
        this.load.image('azul',     'assets/images/Bola_Azul.svg');
        this.load.image('roxo',     'assets/images/Bola_Roxa.svg');
        this.load.image('vazio',    'assets/images/Bola_Branca.svg');
        this.load.image('pause',    'assets/images/botao_pause.svg');
    }

    create () {
        //constante para a responsividade
        const { width, height } = this.scale;

        //adição da imagem de pause
        this.pause = this.add.image(width * 0.95, height * 0.9, 'pause').setScale(0.13).setInteractive().setDepth(108);

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'RegioesMarte' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        //adição do mapa
        this.add.image(width * 0.5, height * 0.68, 'mapa').setScale(0.73);

       //classe slide_marte aplicada
        this.slide = new Slide_Marte(
            this,
            width * 0.03,      // x
            height * 0.05,     // y
            width * 0.94,      // largura
            height * 0.36,     // altura
            32,                // curva
            ['CONHEÇA AS REGIÕES DE MARTE E APRENDA SOBRE AS CARACTERÍSTICAS DE CADA LUGAR!',
            'REGIÕES MAIS ANTIGAS DE MARTE! O SOLO É MUITO IRREGULAR, CHEIO DE CRATERAS DEIXADAS POR METEORITOS.',
            'SÃO REGIÕES PLANAS E JOVENS, FORMADAS POR LAVA QUE ESFRIOU HÁ MUITO TEMPO.', 'GRANDES CRATERAS FORMADAS POR IMPACTOS DE ASTEROIDES, ONDE A PRESSÃO É UM POUCO MAIOR E PODE TER EXISTIDO ÁGUA LÍQUIDA.',
            'SÃO ÁREAS COBERTAS POR UM PÓ FINO E AVERMELHADO, RICO EM ÓXIDO DE FERRO - É ELE QUE DÁ A COR VERMELHA DE MARTE!',
            'AS REGIÕES MAIS FRIAS DE MARTE, PERTO DOS POLOS. TÊM GRANDES QUANTIDADES DE GELO - TANTO DE ÁGUA QUANTO DE CO₂ CONGELADO.'],  // textos
            ['SEJA BEM VINDO(A) À MARTE!', 'TERRAS ALTAS DO SUL', 'PLANÍCIES DO NORTE', 'BACIAS DE IMPACTO', 'REGIÕES EMPOEIRADAS', 'ZONAS POLARES'],  // titulos
            width * 0.2,       // xcor
            height * 0.1,      // ycor
            width * 0.8,       // xcor2
            height * 0.1,      // ycor2
            width * 0.5,       // xTexto
            height * 0.27,     // yTexto
            width * 0.8,       // yLimite (Wrap do texto)
            width * 0.52,      // xTitulo
            height * 0.1,      // yTitulo
            width * 0.92,      // xPlay
            height * 0.17,     // yPlay
            width * 0.072,     // xBotao
            () => { this.scene.start('pergunta_Marte'); }  // novaCena
        );

    // Só depois você chama a função
    this.slide.visivel(true);
    
    //atualiza o tamanho da fonte
    this.events.on('wake', () => {
        this.slide.atualizarTamanho();
    });

    }

}