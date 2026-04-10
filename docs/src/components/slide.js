// Painel de slide com fundo arredondado, título, texto com scroll e botão de navegação.
import TextScroll from "./textScroll.js";
import config from "../global/config.js";

export default class Slide {
    constructor(cena, x, y, largura, altura, curva, texto, titulo, xTexto, yTexto, yLimite, xTitulo, yTitulo, xPlay, yPlay, xBotao, yBotao, novaCena, wrapTitulo ) {
        this.cena = cena;
        this.xTexto = xTexto;
        this.yTexto = yTexto;
        this.larguraTexto = yLimite;
        this.altura = altura;
        this.larguraTitulo = wrapTitulo;

        // Fundo branco com bordas arredondadas.
        this.graphics = cena.add.graphics();
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRoundedRect(x, y, largura, altura, curva);

        // Área de texto rolável ocupa o espaço abaixo do título.
        const alturaTexto = (y + altura) - yTexto - 50;
        this.textoScroll = new TextScroll(this.cena, this.xTexto, this.yTexto, texto, this.larguraTexto, alturaTexto);

        const tituloTexto = titulo;
        this.tituloObj = cena.add.text(xTitulo, yTitulo, tituloTexto, {
            fontSize: `${Math.round(60 * config.fonteEscolhida)}px`,
            fill: '#000000',
            fontFamily: 'APHONT',
            fontStyle: 'bold',
            wordWrap: { width: this.larguraTitulo },
        }).setOrigin(0.5);

        // Botão de avanço: aceita nome de cena ou função personalizada.
        this.play = cena.add.image(xPlay, yPlay, 'direita').setScale(0.12).setInteractive().setOrigin(0.5);
        this.play.on('pointerdown', () => {
            if (typeof novaCena === 'function') novaCena();
            else cena.scene.start(novaCena);
        });

        this.visivel(false);
    }

    // Mostra ou oculta todos os elementos do slide.
    visivel(mostrar) {
        this.graphics.setVisible(mostrar);
        this.tituloObj.setVisible(mostrar);
        this.play.setVisible(mostrar);
        this.textoScroll.setVisivel(mostrar);
    }

    // Reescala título e texto conforme a preferência de fonte do usuário.
    atualizarTamanho() {
        const escala = config.fonteEscolhida || 1;
        if (this.tituloObj) {
            this.tituloObj.setFontSize(`${Math.round(60 * escala)}px`);
            this.tituloObj.setWordWrapWidth(this.larguraTitulo);
        }
        if (this.textoScroll) {
            this.textoScroll.atualizarTamanhoFonte();
        }
    }
}