// criar modal reutilizável
import config from '../global/config.js';
export default class Modal {
    // recebe a scene do Phaser, dimensões, cor de fundo e raio dos cantos
    constructor(scene, width, height, posx, posy, color = 0xffffff, radius = 32) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.color = color;
        this.radius = radius;

        // referência de botão
        this.botaoConfirmar = null; 
        this.containerBotao = null;
        this.botaoValidar = null; 
        this.botaoAcaoGeral = null; // O botão retangular
        
        // controle das alternativas
        this.objetosAlternativas = [];
        this.alternativaSelecionada = null;

        // centraliza o modal na tela
        var x;
        var y;
        if(posx == 2){
            x = scene.scale.width * 0.50;
        }
        else{
            x = posx;
        }
        if(posy == 2){
            y = scene.scale.height * 0.50;
        }
        else{
            y = posy;
        }
        // agrupa os elementos no modal
        this.container = scene.add.container(x, y);

        // modal começa invisível para ser ativado quando precisar
        this.container.setVisible(false);

        // desenha o fundo do modal
        this.drawBackground();
    }

    drawBackground() {
        // desenha um retângulo com cantos arredondados
        const bg = this.scene.add.graphics();
        bg.fillStyle(this.color, 1);
        bg.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this.radius);
        this.container.add(bg);
    }

    // monta o conteúdo do modal (pergunta, texto, alternativas e botões)
    setPergunta(dados) {
        this.perguntaMarte = dados.perguntaMarte === true;

        // remove todos os elementos anteriores
        this.container.removeAll(true);
        // redesenha o fundo
        this.drawBackground();

        // Reseta a seleção
        this.alternativaSelecionada = null; 
        this.objetosAlternativas = [];

        // Verifica se existem alternativas
        const possuiAlternativas = !!(dados.alternativas && Array.isArray(dados.alternativas) && dados.alternativas.length > 0);
        const tamanhoFonte = dados.fontSizeAlternativas || `${Math.round(18 * config.fonteEscolhida)}px`;

        // --- TÍTULO ---
        const estiloPadraoTitulo = {
            fontSize: `${Math.round(80 * config.fonteEscolhida)}px`,
            fontFamily: 'APHONT',
            color: '#000000',
            fontWeight: '700',
            align: 'center',
            wordWrap: { width: (this.width - 40) * 2 }
        };

        // texto centralizado
        const titulo = this.scene.add.text(
            0, 
            dados.yTitulo || -this.height / 2 + 120, 
            dados.titulo, 
            { ...estiloPadraoTitulo, ...dados.estiloTitulo }
        ).setOrigin(0.5).setScale(0.5);

        // --- DESCRIÇÃO ---
        const estiloPadraoDesc = {
            fontSize: `${Math.round(45 * config.fonteEscolhida)}px`,
            fontFamily: 'APHONT',
            fontWeight: '700',
            lineSpacing: 15,
            color: '#000000',
            align: 'center',
            wordWrap: { width: (this.width - 60) * 2 }
        };

        const descricao = this.scene.add.text(
            0, 
            dados.yDescricao || 0, 
            dados.descricao, 
            { ...estiloPadraoDesc, ...dados.estiloDescricao }
        ).setOrigin(0.5).setScale(0.5);

        // Adiciona título e descrição primeiro
        this.container.add([titulo, descricao]);

        // --- ALTERNATIVAS ---

        if (dados.alternativas && Array.isArray(dados.alternativas)) {
    
            // Configuração do layout das alternativas
            const larguraAlt = this.width * 0.42;
            const alturaCard = 90; // Ajustado para caber o texto em CAIXA ALTA
            const espacamentoX = this.width * 0.50;
            const espacamentoY = 140; // Aumentado um pouco para não sobrepor
            const yInicial = dados.yAlternativas || 20;

            dados.alternativas.forEach((textoAlt, index) => {
                 // Define coluna e linha
                const coluna = index % 2; 
                const linha = Math.floor(index / 2);
                const posX = (coluna === 0) ? -espacamentoX / 2 : espacamentoX / 2;
                const posY = yInicial + (linha * espacamentoY);

                // criar o card
                const bgAlt = this.scene.add.graphics();
                bgAlt.fillStyle(0xEBD973, 1);
                const alturaCard = 120; // garante que o texto em caixa alta caiba com margem
                bgAlt.fillRoundedRect(posX - larguraAlt / 2, posY - (alturaCard / 2), larguraAlt, alturaCard, 15);

                // criar o texto 
                const txtAlt = this.scene.add.text(posX, posY, textoAlt.toUpperCase(), {
                    fontSize: tamanhoFonte,
                    fontFamily: 'APHONT',
                    fontWeight: '900',         
                    color: '#000000', 
                    align: 'center', 
                    wordWrap: { width: larguraAlt - 40 } 
                });
            
                // centraliza o texto no meio do card
                txtAlt.setOrigin(0.5);

                // Área de clique
                const zonaAlt = this.scene.add.rectangle(posX, posY, larguraAlt, alturaCard, 0, 0)
                    .setInteractive({ useHandCursor: true });

                this.objetosAlternativas.push({ 
                    graphics: bgAlt, 
                    posY, 
                    posX, 
                    largura: larguraAlt, 
                    altura: alturaCard 
                });

                zonaAlt.on('pointerdown', () => {
                    this.alternativaSelecionada = index;

                    // --- BOTÃO ENVIAR  ---
                    const larguraBtn = 160;
                    const alturaBtn = 60;

                    // posição no canto inferior direito
                    const btnEnviarX = (this.width / 2) - (larguraBtn / 2) - 40;
                    const btnEnviarY = (this.height / 2) - (alturaBtn / 2) - 20;

                    const bgEnviar = this.scene.add.graphics();
                    bgEnviar.fillStyle(0x001529, 1); // cor de fundo
                    bgEnviar.fillRoundedRect(-larguraBtn / 2, -alturaBtn / 2, larguraBtn, alturaBtn, 12);

                    const txtEnviar = this.scene.add.text(0, 0, "ENVIAR", {
                        fontSize: `${Math.round(22 * config.fonteEscolhida)}px`,
                        fontFamily: 'APHONT',
                        fontWeight: '900',
                        color: '#ffffff' 
                    }).setOrigin(0.5);

                    const zonaEnviar = this.scene.add.rectangle(0, 0, larguraBtn, alturaBtn, 0, 0)
                        .setInteractive({ useHandCursor: true });

                    // atribuindo ao this.botaoValidar para controle de visibilidade
                    this.botaoValidar = this.scene.add.container(btnEnviarX, btnEnviarY, [bgEnviar, txtEnviar, zonaEnviar]);
                    this.botaoValidar.setVisible(false); // Começa escondido

                    zonaEnviar.on('pointerdown', () => {
                        if (this.alternativaSelecionada !== null) {
                            // mostra o feedback visual
                            this.apresentarFeedback(dados.correta !== undefined ? dados.correta : dados.indiceCorreto);
                            
                            // executa a ação de check 
                            if (dados.acaoCheck) dados.acaoCheck();

                            // botão desaparece 
                            this.botaoValidar.setVisible(false);
                        }
                    });
                
                    this.container.add(this.botaoValidar);
        
                    // ativa o botão enviar
                    if (this.botaoValidar) {
                        this.botaoValidar.setVisible(true);
                    }

                    // atualiza o visual de todos os cards
                    this.objetosAlternativas.forEach((obj, i) => {
                        obj.graphics.clear();
                        const tamanhoFonte = dados.fontSizeAlternativas || `${Math.round(18 * config.fonteEscolhida)}px`; // usa o que vem da lista ou 18px por padrão
                        
                        if (i === index) {
                            // opção selecionada: borda preta e fundo branco
                            obj.graphics.lineStyle(4, 0x000000, 1); 
                            obj.graphics.fillStyle(0xFFFFFF, 1); 
                        } else {
                            // opção não selecionada: sem borda e fundo amarelado
                            obj.graphics.lineStyle(0);
                            obj.graphics.fillStyle(0xEBD973, 1); 
                        }
                        
                        // Desenha o retângulo 
                        obj.graphics.fillRoundedRect(obj.posX - obj.largura / 2, obj.posY - (obj.altura / 2), obj.largura, obj.altura, 15);
                        obj.graphics.strokeRoundedRect(obj.posX - obj.largura / 2, obj.posY - (obj.altura / 2), obj.largura, obj.altura, 15);
                    });
                });

                this.container.add([bgAlt, txtAlt, zonaAlt]);
            });

        } else {
            // se não houver alternativas, o array de objetos ficará vazio
            this.objetosAlternativas = [];
        }

        // --- BOTÃO DE AÇÃO GERAL ---
        const btnY = dados.yBotao !== undefined ? dados.yBotao : (this.height / 2 - 70);
        const btnW = dados.larguraBotao !== undefined ? dados.larguraBotao : 240;
        const btnH = dados.alturaBotao !== undefined ? dados.alturaBotao : 60;
        const btnFont = dados.fontSizeBotao !== undefined ? dados.fontSizeBotao : `${Math.round(40 * config.fonteEscolhida)}px`;
        const bgBtn = this.scene.add.graphics();

        bgBtn.lineStyle(4, 0x00000, 1); // espessura 4, cor preta
        bgBtn.fillStyle(0xEBD973, 1);

        // desenha o fundo
        bgBtn.fillRoundedRect(-(btnW / 2), -(btnH / 2), btnW, btnH, 20);

        // desenha a borda
        bgBtn.strokeRoundedRect(-(btnW / 2), -(btnH / 2), btnW, btnH, 20);
        
        const txtBtn = this.scene.add.text(0, 0, dados.textoBotao || "CONTINUAR", {
            fontSize: btnFont, fontFamily: 'APHONT',fontWeight: '700', color: '#000000'
        }).setOrigin(0.5).setScale(0.5);
        const zonaAcao = this.scene.add.rectangle(0, 0, btnW, btnH, 0, 0).setInteractive({ useHandCursor: true });        
        this.botaoAcaoGeral = this.scene.add.container(0, btnY, [bgBtn, txtBtn, zonaAcao]);
        
        // se tem alternativas, o botão de ação geral fica escondido (esperando o fluxo de resposta)
        this.botaoAcaoGeral.setVisible(!possuiAlternativas);

        zonaAcao.on('pointerdown', () => {
            if (dados.fecharAoClicar !== false) this.hide_slow(); 
            if (dados.acao) dados.acao();
        });

        this.container.add(this.botaoAcaoGeral);

        const escalaDesejada = dados.escalaBotao !== undefined ? dados.escalaBotao : 1;
        this.botaoAcaoGeral.setScale(escalaDesejada);
    }

    // mostra o feedback visual (certo / errado)
    apresentarFeedback(indiceCorreto) {
        this.objetosAlternativas.forEach((obj, i) => {
            if (!this.perguntaMarte) {
                obj.graphics.clear();

                let corFinal;
                let alpha = 1;

                if (indiceCorreto.includes(i)) {
                    // Se for a correta, fica verde
                    corFinal = 0x7DA854; 
                } else if (i === this.alternativaSelecionada) {
                    // Se escolher a errada, fica vermelha
                    corFinal = 0xFF0000; 
                } else {
                    // Mantém a cor original (0xEF766D), mas com transparência (0.3)
                    corFinal = 0xEF766D; 
                    alpha = 0.3; 
                }

                obj.graphics.fillStyle(corFinal, alpha);
            } 
            
            // Redesenha usando as propriedades salvas no objeto
            obj.graphics.fillRoundedRect(
                obj.posX - obj.largura / 2, 
                obj.posY - (obj.altura / 2), 
                obj.largura, 
                obj.altura, 
                15
            );
        });
    }

    // ativa o overlay escuro — chamar só nas cenas que precisam
    enableOverlay() {
        this.overlay = this.scene.add.rectangle(
            this.scene.scale.width * 0.50, this.scene.scale.height * 0.50,
            this.scene.scale.width, this.scene.scale.height,
            0x0a0d30
        ).setDepth(this.container.depth - 1).setVisible(false);
    }

    // exibe o modal
    show() {
        if (this.overlay) this.overlay.setVisible(true);
        this.container.setVisible(true);
    }
    
    // exibe com animação
    show_slow() { 
        this.container.setAlpha(0);
        this.container.setVisible(true);
        this.scene.tweens.add({
            targets: this.container,
            alpha: { from: 0, to: 1 },
            duration: 400,
            ease: 'Sine.easeInOut',
        });
        
    }

    // esconde o modal
    hide() {
        if (this.overlay) this.overlay.setVisible(false);
        this.container.setVisible(false);
    }

    hide_slow() {
        this.scene.tweens.add({
            targets: this.container,
            alpha: { from: 1, to: 0 },
            duration: 400,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                if (this.overlay) this.overlay.setVisible(false);
                this.container.setVisible(false);
                this.container.setAlpha(1);
            }
        });
    }

    // remove o modal da memória
    destroy() {
        if (this.overlay) this.overlay.destroy();
        this.container.destroy();
    }
}