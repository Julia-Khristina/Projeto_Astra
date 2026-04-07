//Importa o tamanho da fonte a ser escolhida
import config from '../global/config.js';
// importa os dados da mensagem de boas-vindas
import instrucaoBemVindo from '../mensagens/instrucao_bem_vindo.js';
// importa a classe modal
import Modal from '../components/modal.js';
 
// cena de boas-vindas
export default class BemVindo extends Phaser.Scene {
    // construtor da cena
    constructor() {
        super("BemVindo"); // define o nome da cena
    }
 
    preload() {
        this.load.image('pause', 'assets/images/botao_pause.svg');
    }
 
    // método executado quando a cena é criada
    create() {
        const { width, height } = this.scale;
 
        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive();
 
        // armazena o array da mensagem de boas-vindas
        this.instrucaoBemVindo  = instrucaoBemVindo;
        // indice da instrução
        this.indicePergunta = 0;
 
        // cria o modal com largura e altura definidas
        this.modal = new Modal(this, width / 2, height / 2, 2, 2);
 
        // exibe a instrução inicial
        this.mostrarInstrucao();
 
        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'BemVindo' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible) {
            this.mostrarInstrucao(); 
            }
        });
    }
 
    // método de exibição da mensagem no modal
    mostrarInstrucao() {
        const atual = this.instrucaoBemVindo [this.indicePergunta];

        const escala = config.fonteEscolhida || 1;

        // recalcula o fontSize com o valor atual do config
        atual.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;
        atual.estiloDescricao.fontSize = `${Math.round(70 * escala)}px`;
        atual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala)};
        
        // ação de mudar de cena para "Sistema_Solar"
        atual.acao = () => {
            console.log("Indo para o Tutorial...");

            this.scene.start("Sistema_Solar");
        };
 
        this.modal.setPergunta(atual);
 
        // modal visível na tela
        this.modal.show();
    }
}