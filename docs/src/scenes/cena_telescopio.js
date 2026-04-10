import config from '../global/config.js';
import Astro from "../components/astros.js"
import Badge from "../components/Badge.js";
import Modal from "../components/modal.js";
import instrucaoTelescopio from "../mensagens/instrucao_telescopio.js";

export default class Cena_zoom extends Phaser.Scene {

    constructor() {
        super({ key: 'Cena_zoom' });
    }

    preload() {
        // assets dos astros observáveis e elementos visuais da cena
        this.load.image('astro1',    'assets/images/Buraco_Negro.svg');
        this.load.image('astro2',    'assets/images/Galaxia_Andromeda.svg');
        this.load.image('astro3',    'assets/images/Nebulosa.svg');
        this.load.svg('Lente',       'assets/images/Telescopio_terra.svg', { width: 10000 });
        this.load.image('Container', 'assets/images/Coletor_Objetos_Coletaveis.svg');
        this.load.image('Badge1',    'assets/images/Medalha_Buraco_Negro.svg');
        this.load.image('Badge2',    'assets/images/Medalha_Galaxia_Andromeda.svg');
        this.load.image('Badge3',    'assets/images/Medalha_Nubulosa.svg');
        this.load.image('pause',     'assets/images/botao_pause.svg');
    }

    create() {
        const { width, height } = this.scale;
        
        this.pause = this.add.image(width * 0.95, height * 0.10, 'pause').setScale(0.13).setInteractive();

        //se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            //ele começa a tela de configuração e guarda o valor da cena anterior
            this.scene.launch('Pause', { cenaAnterior: 'Cena_zoom' });
            //a tela anterior é "guardada"
            this.scene.sleep();
        });

        // posição inicial da câmera para restaurar ao voltar o zoom
        this.posicaoInicialX = this.cameras.main.centerX;
        this.posicaoInicialY = this.cameras.main.centerY;

        // rastreia quais badges já foram desbloqueados pelo jogador
        this.listaAcertos = [false, false, false];

        // cria os três astros posicionados na cena com escala e índice próprios
        this.listaAstros = [
            new Astro(this, width * 0.61, height * 0.17, 'astro1', 0.40, 0),
            new Astro(this, width * 0.35, height * 0.76, 'astro2', 0.20, 1),
            new Astro(this, width * 0.78, height * 0.69, 'astro3', 0.30, 2),
        ];

        // lente de destaque posicionada atrás dos astros
        this.imagemLente = this.add.image(width * 0.51, height * 0.49, 'Lente').setDepth(-1);
        this.imagemLente.setScale(0.6);

        // container lateral que exibe os badges coletados
        this.imagemContainer = this.add.image(width * -0.04, height * 0.49, 'Container');
        this.imagemContainer.setScale(1.2);

        // badges distribuídos verticalmente dentro do container
        this.listaBadges = [
            new Badge(this, width * -0.04, height * 0.26, 'Badge1'),
            new Badge(this, width * -0.04, height * 0.49, 'Badge2'),
            new Badge(this, width * -0.04, height * 0.71, 'Badge3'),
        ];

        this.cameras.main.zoom = 0.8;

        // clique fora de qualquer objeto retorna a câmera à posição inicial
        this.input.on('pointerdown', (pointer, listaObjetosClicados) => {
            if (listaObjetosClicados.length === 0) {
                this.voltar();
            }
        });

        this.instrucaoTelescopio = instrucaoTelescopio;

        // modal exibido ao concluir a coleta de todos os badges
        this.modalConcluido = new Modal(this, width * 0.47, height * 0.63, 2, 2, 0xffffff, 20);

        this.events.on('atualizarFonte', () => {
            if (this.modalConcluido && this.modalConcluido.container && this.modalConcluido.container.scene && this.modalConcluido.container.visible) {
            this.conquistouBadges();
            }
        });
    }

    fecharModais() {
        // esconde o painel de informações de todos os astros
        this.listaAstros.forEach(astro => astro.hide());
    }

    voltar() {
        // retorna câmera suavemente à posição e zoom iniciais
        this.cameras.main.pan(this.posicaoInicialX, this.posicaoInicialY, 600, 'Power2');
        this.cameras.main.zoomTo(0.8, 600, 'Power2');
        this.fecharModais();
    }

    conquistouBadges() {
        // verifica se todos os badges foram desbloqueados
        let todosDesbloqueados = true;
        for (const indice in this.listaAcertos) {
            if (!this.listaAcertos[indice]) {
                todosDesbloqueados = false;
            }
        }

        if (todosDesbloqueados) {
            this.voltar();

            // exibe modal de conclusão e avança para a próxima cena ao confirmar
            const instrucaoConclusao = this.instrucaoTelescopio[3];

            const escala = config.fonteEscolhida || 1;

            // recalcula o fontSize com o valor atual do config
            instrucaoConclusao.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;
            instrucaoConclusao.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };
            instrucaoConclusao.estiloDescricao.fontSize = `${Math.round(70 * escala)}px`;

            instrucaoConclusao.acao = () => {
                this.scene.start("AnosLuz");
            };

            this.modalConcluido.setPergunta(instrucaoConclusao);
            this.modalConcluido.show_slow();
        }
    }
}