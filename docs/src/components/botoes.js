import config from '../global/config.js'

export default class Botao {

    // Cria um botão interativo composto por uma caixa gráfica arredondada e um texto centralizado
    // cena        - a cena Phaser onde o botão será criado
    // larguraCaixa - largura da caixa do botão em pixels
    // x           - posição horizontal do centro do botão
    // y           - posição vertical do centro do botão
    // texto       - texto exibido dentro do botão
    constructor(cena, larguraCaixa, x, y, texto) {

        this.cena = cena;

        // Dimensões e posição da caixa
        const largura = larguraCaixa;      // largura do parâmetro da cena
        const altura  = 70;                // altura fixa para todos os botões
        const caixaX  = x - largura / 2;  // canto superior esquerdo (eixo X)
        const caixaY  = y - altura  / 2;  // canto superior esquerdo (eixo Y)

        // graphics() permite desenhar formas geométricas programaticamente na cena
        const caixa = cena.add.graphics();

        // Redesenha a caixa com a cor informada
        // Limpa o desenho anterior antes de aplicar a nova cor,
        // permitindo simular efeitos de sobreposição sem criar novos objetos
        function pintarCaixa(cor) {
            caixa.clear();                                               // apaga o desenho anterior
            caixa.fillStyle(cor, 1);                                     // define cor de preenchimento (alpha = 1)
            caixa.lineStyle(3, 0x000000, 1);                             // borda preta com 3px de espessura
            caixa.fillRoundedRect(caixaX, caixaY, largura, altura, 32);  // retângulo arredondado preenchido
            caixa.strokeRoundedRect(caixaX, caixaY, largura, altura, 32);// contorno do retângulo arredondado
        }

        // Renderiza a caixa na cor inicial: branco
        pintarCaixa(0xffffff);

        // Cria o texto do botão centralizado na posição x, y
        // O tamanho da fonte é escalado pelo fator global config.fonteEscolhida,
        // permitindo acessibilidade (fonte maior/menor conforme preferência do usuário)
        const botao = cena.add.text(x, y, texto, {
            fontFamily: 'APHONT',
            fontSize: `${Math.round(32 * config.fonteEscolhida)}px`,  // tamanho base 32px × escala global
            color: '#000000',                                          // cor do texto: preto
        }).setPadding(32)   // espaçamento interno para o texto não encostar nas bordas
          .setOrigin(0.5);  // ancora o texto no seu próprio centro (x=0.5, y=0.5)

        // Torna a caixa clicável usando um retângulo como área de clique
        caixa.setInteractive(
            new Phaser.Geom.Rectangle(caixaX, caixaY, largura, altura), // área sensível ao mouse
            Phaser.Geom.Rectangle.Contains                              // função que testa se o ponto está dentro
        );

        // Quando o cursor entra na área do botão: destaca com amarelo
        caixa.on('pointerover', () => {
            pintarCaixa(0xFFDE59);
        });

        // Quando o cursor sai da área do botão: volta ao branco
        caixa.on('pointerout', () => {
            pintarCaixa(0xffffff);
        });

        // Define a profundidade de renderização para garantir que o texto fique sempre visível acima da caixa
        caixa.setDepth(1);  // caixa na camada 1 (atrás)
        botao.setDepth(2);  // texto na camada 2 (na frente)

        // Expõe os objetos para que outras classes possam manipulá-los
        this.botao = botao;
        this.caixa = caixa;
    }
}
