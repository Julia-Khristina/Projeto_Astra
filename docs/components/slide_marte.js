import config from '../global/config.js';

// Classe que representa um slide informativo na cena de Marte.
// Exibe um painel com título, texto e botões de navegação entre slides.
export default class Slide_Marte {
    constructor(cena, x, y, largura, altura, curva, textos, titulos, xcor, ycor, xcor2, ycor2, xTexto, yTexto, yLimite, xTitulo, yTitulo, xPlay, yPlay, xBotao, novaCena) {
        this.cena = cena;

        // Desenha o painel de fundo branco com bordas arredondadas
        this.graphics = cena.add.graphics();
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRoundedRect(x, y, largura, altura, curva);

        // Armazena as listas de conteúdo e o índice do slide atual
        this.listaTextos = textos;
        this.listaTitulo = titulos;
        this.indiceAtual = 0;

        // Texturas usadas para as imagens decorativas de cor a cada slide
        this.listaCor = ['vazio', 'roxo', 'azul', 'ciano', 'laranja', 'branco'];

        // Texto do corpo do slide, centralizado horizontalmente setOrigin(0.5) ancora no centro para facilitar o posicionamento
        this.texto = cena.add.text(xTexto, yTexto, this.listaTextos[this.indiceAtual], {
            fontSize: `${Math.round(32 * config.fonteEscolhida)}px`, 
            fill: '#000000',
            align: 'center',
            fontFamily: 'APHONT',
            fontStyle: 'bold',
            lineSpacing: 10,
            wordWrap: { width: yLimite }, // Quebra de linha automática
        }).setOrigin(0.5);

        // Título do slide, também centralizado
        this.titulo = cena.add.text(xTitulo, yTitulo, this.listaTitulo[this.indiceAtual], {
            fontSize: `${Math.round(45 * config.fonteEscolhida)}px`, 
            fill: '#000000',
            fontFamily: 'APHONT',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: yLimite },
        }).setOrigin(0.5);

        // Imagens decorativas de cor (exibidas a partir do segundo slide)
        this.cor1 = cena.add.image(xcor, ycor, this.listaCor[this.indiceAtual]).setDepth(101).setScale(0.12);
        this.cor2 = cena.add.image(xcor2, ycor2, this.listaCor[this.indiceAtual]).setDepth(101).setScale(0.12);

        // Inicia as imagens ocultas (primeiro slide usa textura 'vazio')
        this.cor1.setVisible(false);
        this.cor2.setVisible(false);

        // Botão para avançar ao próximo slide (seta para direita)
        this.play = cena.add.image(xPlay, yPlay, 'direita').setScale(0.12).setInteractive();

        // Botão para voltar ao slide anterior (seta para esquerda), inicialmente oculto
        this.botao = cena.add.image(xBotao, yPlay, 'esquerda').setScale(0.12).setInteractive();
        this.botao.setVisible(false);

        // Evento do botão avançar
        this.play.on('pointerdown', () => {
            if (this.indiceAtual < this.listaTextos.length - 1) {
                // Avança para o próximo slide
                this.indiceAtual++;
                this.titulo.setText(this.listaTitulo[this.indiceAtual]);
                this.texto.setText(this.listaTextos[this.indiceAtual]);

                // Atualiza a textura da primeira imagem de cor
                this.cor1.setTexture(this.listaCor[this.indiceAtual]);
                if (this.listaCor[this.indiceAtual] === 'vazio') {
                    this.cor1.setVisible(false);
                } 
                else {
                    this.cor1.setVisible(true);
                }

                // Atualiza a textura da segunda imagem de cor
                this.cor2.setTexture(this.listaCor[this.indiceAtual]);
                if (this.listaCor[this.indiceAtual] === 'vazio') {
                    this.cor2.setVisible(false);
                } 
                else {
                    this.cor2.setVisible(true);
                }

                // Exibe o botão de voltar ao sair do primeiro slide
                this.botao.setVisible(true);    
            } else {
                // Último slide: navega para a próxima cena (função ou nome de cena)
                if (typeof novaCena === 'function') {
                    novaCena(); 
                } else {
                    cena.scene.start(novaCena); 
                }
            }
        });

        // Evento do botão voltar
        this.botao.on('pointerdown', () => {
            if (this.indiceAtual > 0) {
                // Retrocede para o slide anterior
                this.indiceAtual--;
                this.titulo.setText(this.listaTitulo[this.indiceAtual]);
                this.texto.setText(this.listaTextos[this.indiceAtual]);

                // Atualiza a textura da primeira imagem de cor
                this.cor1.setTexture(this.listaCor[this.indiceAtual]);
                if (this.listaCor[this.indiceAtual] === 'vazio') {
                    this.cor1.setVisible(false);
                } 
                else {
                    this.cor1.setVisible(true);
                }

                // Atualiza a textura da segunda imagem de cor
                this.cor2.setTexture(this.listaCor[this.indiceAtual]);
                if (this.listaCor[this.indiceAtual] === 'vazio') {
                    this.cor2.setVisible(false);
                } 
                else {
                    this.cor2.setVisible(true);
                }
            }

            // Oculta o botão de voltar ao retornar ao primeiro slide
            if (this.indiceAtual === 0) {
                this.botao.setVisible(false);
            }
        });      
        
        // Agrupa todos os elementos em um container com depth alto, garantindo que o painel fique sobre o mapa e outros elementos da cena
        this.lousa = cena.add.container(0, 0, [this.graphics, this.texto, this.play, this.botao, this.titulo, this.cor1, this.cor2]);
        this.lousa.setDepth(100);
        this.lousa.setVisible(true);
    }

    // Controla a visibilidade do painel de slides mostrar: true para exibir, false para ocultar
    visivel(mostrar) {
        this.lousa.setVisible(mostrar);
    }

    // Atualiza o tamanho das fontes de acordo com a escala configurada. Deve ser chamado quando o usuário alterar as preferências de fonte
    atualizarTamanho() {
        const escala = config.fonteEscolhida || 1;
        this.texto.setFontSize(`${Math.round(32 * escala)}px`);
        this.titulo.setFontSize(`${Math.round(45 * escala)}px`);
    }
}