// Importa a função que criamos (o caminho depende de onde seu arquivo de cena está salvo)
import exibirModalParabenizacao from '../mensagens/mensagem_parabenizacao.js';

export default class cenaParabenizacao extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaParabenizacao' });
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('pause',     'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;
        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive();

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'cenaParabenizacao' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        // 1. Coloca a logo na tela
        this.add.image(width * 0.50, height * 0.24, 'logo');

        // 2. Chama o modal com todas as configurações do outro arquivo!
        this.modal = exibirModalParabenizacao(this);
    }
}