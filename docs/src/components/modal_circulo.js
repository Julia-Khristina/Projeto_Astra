export default class modal_circulo {
    constructor(scene, titulo) {
        this.scene = scene;
        this.titulo = titulo; // título do modal
        this.container = null;  // agrupa todos os elementos no container principal

        // círculo aguardando o próximo badge
        // 1, 2 ou null (os 2 já preenchidos)
        this.circuloAtivo = 1;

        // chaves dos badges em cada círculo
        this.chave1 = null;
        this.chave2 = null;

        // img exibidas dentro dos círculos 
        this.imagem1 = null;
        this.imagem2 = null;

        // objetos gráficos dos círculos 
        this.circulo1 = null;
        this.circulo2 = null;
    }

    create() {
        // calcula o centro da tela
        const cx = this.scene.scale.width / 2;
        const cy = this.scene.scale.height / 2;

        // dimensões e posição do fundo do modal
        const modalW = 750;
        const modalH = 500;
        const modalX = cx - modalW / 2;
        const modalY = cy - modalH / 2;

        // container que agrupa todos os elementos
        this.container = this.scene.add.container(0, 0);
        this.container.setDepth(9); 

        // overlay escuro atrás do modal 
        const overlay = this.scene.add.rectangle(
            cx, cy,
            this.scene.scale.width,
            this.scene.scale.height,
            0x000000, 0.45
        ).setInteractive(); // bloqueia cliques no que está atrás
        this.container.add(overlay);

        // fundo branco arredondado do modal 
        const bg = this.scene.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.fillRoundedRect(modalX, modalY, modalW, modalH, 28);
        this.container.add(bg);

        // texto do título = atualizado via setTitulo() 
        this.tituloText = this.scene.add.text(cx, modalY + 90, this.titulo, {
            fontFamily: 'APHONT',
            fontSize: '35px',
            color: '#111111',
            align: 'center',
            lineSpacing: 6,
            wordWrap: { width: 700 }, // quebra o texto para não ultrapassar o modal
        }).setOrigin(0.5, 0.5);
        this.container.add(this.tituloText);

        // posições fixas dos 2 círculos
        this.c1x = cx - 110; // círculo 1 (esquerda)
        this.c1y = cy + 20;
        this.c2x = cx + 110; // círculo 2 (direita)
        this.c2y = cy + 20;

        // círculo 1 
        // graphics = redesenhar p/ destacar o ativo 
        this.circulo1 = this.scene.add.graphics();
        this.container.add(this.circulo1);

        // sinal de +
        const plus = this.scene.add.text(cx, this.c1y, '+', {
            fontFamily: 'APHONT',
            fontSize: '48px',
            color: '#222222',
        }).setOrigin(0.5, 0.5);
        this.container.add(plus);

        // circulo 2
        this.circulo2 = this.scene.add.graphics();
        this.container.add(this.circulo2);

        // botão de enviar
        this.btnX = cx;
        this.btnY = modalY + modalH - 70;
        this.btnW = 200;
        this.btnH = 50;

        this.btnBg = this.scene.add.graphics();
        this._drawBtn(this.btnBg, this.btnX, this.btnY, this.btnW, this.btnH);
        this.container.add(this.btnBg);

        this.btnLabel = this.scene.add.text(this.btnX, this.btnY, 'ENVIAR', {
            fontFamily: 'APHONT',
            fontSize: '18px',
            color: '#111111',
        }).setOrigin(0.5, 0.5);
        this.container.add(this.btnLabel);

        const btnZone = this.scene.add.zone(this.btnX, this.btnY, this.btnW, this.btnH)
            .setInteractive({ useHandCursor: true });
        this.container.add(btnZone);

        btnZone.on('pointerdown', () => this.onEnviar());

        // desenha os círculos com o 1 já destacado como ativo
        this.destacarCirculo(1);
    }

    // atualiza o título sem recriar o modal
    setTitulo(texto) {
        this.tituloText?.setText(texto);
    }

    // destaque do círculo ativo 

    destacarCirculo(numero) {
        const COR_NORMAL = 0xe8d86a; // amarelo 
        const COR_ATIVA = 0xf5e97a; // amarelo mais claro 
        const RAIO = 72;

        // redesenha o círculo 1 = com borda preta se for o ativo
        this.circulo1.clear();
        if (numero === 1) {
            this.circulo1.lineStyle(4, 0x000000, 1);
            this.circulo1.strokeCircle(this.c1x, this.c1y, RAIO + 4);
        }
        this.circulo1.fillStyle(numero === 1 ? COR_ATIVA : COR_NORMAL, 1);
        this.circulo1.fillCircle(this.c1x, this.c1y, RAIO);

        // redesenha o círculo 2 = com borda preta se for o ativo
        this.circulo2.clear();
        if (numero === 2) {
            this.circulo2.lineStyle(4, 0x000000, 1);
            this.circulo2.strokeCircle(this.c2x, this.c2y, RAIO + 4);
        }
        this.circulo2.fillStyle(numero === 2 ? COR_ATIVA : COR_NORMAL, 1);
        this.circulo2.fillCircle(this.c2x, this.c2y, RAIO);
    }

    // recebe o badge clicado no container
    receberBadge(chave) {
        if (this.circuloAtivo === 1) {
            this.imagem1?.destroy();

            this.chave1  = chave;
            this.imagem1 = this.scene.add.image(this.c1x, this.c1y, chave)
                .setScale(0.08)
                .setInteractive();
            this.container.add(this.imagem1);
            this.container.bringToTop(this.imagem1);

            this.imagem1.once('pointerdown', () => this._retirarDoCirculo(1));

            // se o círculo 2 já estiver preenchido, nenhum fica ativo
            // caso contrário, foca no 2
            this.circuloAtivo = this.chave2 ? null : 2;
            this.destacarCirculo(this.circuloAtivo);
            this.retirarBadge();

        } else if (this.circuloAtivo === 2) {
            this.imagem2?.destroy();

            this.chave2  = chave;
            this.imagem2 = this.scene.add.image(this.c2x, this.c2y, chave)
                .setScale(0.08)
                .setInteractive();
            this.container.add(this.imagem2);
            this.container.bringToTop(this.imagem2);

            this.imagem2.once('pointerdown', () => this._retirarDoCirculo(2));

            this.circuloAtivo = null;
            this.destacarCirculo(null);
            this.retirarBadge();
        }

        // atualiza visual do botão sempre que o estado mudar
        this._atualizarBotao();
    }

    _retirarDoCirculo(numero) {
        if (numero === 1) {
            this.imagem1?.destroy();
            this.imagem1 = null;
            this.chave1  = null;
            this.circuloAtivo = 1; // volta para o círculo 1
        } else {
            this.imagem2?.destroy();
            this.imagem2 = null;
            this.chave2  = null;
            // se o círculo 1 já estiver preenchido, foca no 2
            // caso contrário foca no 1
            this.circuloAtivo = this.chave1 ? 2 : 1;
        }
        this.destacarCirculo(this.circuloAtivo);

        // atualiza visual do botão sempre que o estado mudar
        this._atualizarBotao();
    }

    // reseta os círculos para nova tentativa 

    resetar() {
        // remove as imgs dos badges dos círculos
        this.imagem1?.destroy();
        this.imagem2?.destroy();

        // limpa o estado interno
        this.imagem1 = null;
        this.imagem2 = null;
        this.chave1  = null;
        this.chave2  = null;

        // foco para o círculo 1
        this.circuloAtivo = 1;
        this.destacarCirculo(1);
    }

    _drawBtn(g, x, y, w, h) {
        g.clear();
        g.fillStyle(0xe8d86a, 1);
        g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 12);
        g.lineStyle(3, 0x111111, 1);
        g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 12);
    }

    onEnviar() {
        if (!this.chave1 || !this.chave2) return; // bloqueio mantido por segurança
        this.scene.onEnviarDesafio(this.chave1, this.chave2);
    }

    // mostra/esconde o modal pelo container
    setVisible(visible) {
        this.container?.setVisible(visible);
    }
}