import config from '../global/config.js';
import Modal from './modal.js';
import instrucaoTelescopio from '../mensagens/instrucao_telescopio.js';

export default class Astro {

    constructor(scene, x, y, imagem, escala, index) {

        this.index  = index;
        this.cena   = scene;

        // sprite estático interativo que representa o astro na cena
        this.spriteAstro = scene.physics.add.staticImage(x, y, imagem).setScale(escala);
        this.spriteAstro.setInteractive();
        this.spriteAstro.setDepth(-1);

        // modal de informações exibido ao clicar no astro
        this.modalAstro = new Modal(scene, 300, 150, x + 200, y - 50, 0xffffff, 20);
        this.instrucaoTelescopio = instrucaoTelescopio;

        const fontSizesTitulo    = [30, 34, 34];
        const fontSizesDescricao = [18, 21, 21];
        const wordWrapsTitulo    = [2000, 2000, 2000];
        const wordWrapsDescricao = [430, 430, 430];

        this.spriteAstro.on('pointerdown', () => {

            // fecha painéis abertos e interrompe animações de câmera em andamento
            scene.fecharModais();
            scene.cameras.main.stopFollow();
            scene.cameras.main.panEffect.reset();
            scene.cameras.main.zoomEffect.reset();

            // aproxima a câmera suavemente no astro clicado
            scene.cameras.main.pan(this.spriteAstro.x + 75, this.spriteAstro.y, 600, 'Power2');
            scene.cameras.main.zoomTo(2.4, 600, 'Power2');

            const instrucaoAtual = this.instrucaoTelescopio[this.index];

            instrucaoAtual.estiloTitulo.fontSize    = `${Math.round(fontSizesTitulo[this.index] * config.fonteEscolhida)}px`;
            instrucaoAtual.estiloTitulo.wordWrap    = { width: Math.round(wordWrapsTitulo[this.index] * config.fonteEscolhida) };
            instrucaoAtual.estiloDescricao.fontSize = `${Math.round(fontSizesDescricao[this.index] * config.fonteEscolhida)}px`;
            instrucaoAtual.estiloDescricao.wordWrap = { width: Math.round(wordWrapsDescricao[this.index] * config.fonteEscolhida) };

            // ao confirmar: ativa o badge, registra acerto e verifica conclusão
            instrucaoAtual.acao = () => {
                this.cena.listaBadges[this.index].ativar();
                this.cena.listaAcertos[this.index] = true;
                this.cena.conquistouBadges();
                this.modalAstro.hide_slow();
                this.cena.voltar();
            };

            this.modalAstro.setPergunta(instrucaoAtual);
            this.modalAstro.show_slow();
        });
    }

    hide() {
        this.modalAstro.hide();
    }
}