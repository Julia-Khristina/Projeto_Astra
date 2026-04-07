import Modal from './modal.js';

export default class SistemaVidas {

    constructor(cena, vidas = 3, escala = 0.08) {
        const { width, height } = cena.scale;
        this.cena        = cena;         // a cena onde os corações vão aparecer
        this.x           = width  * 0.03;
        this.y           = height * 0.07;
        this.vidaMaxima  = vidas;        // quantas vidas o jogador tem no total
        this.vidas       = vidas;        // quantas ainda restam (esse vai diminuindo)
        this.espacamento = width  * 0.05; // espaço entre um coração e outro
        this.escala      = escala;        // quão grande é o coração (0.08 = bem pequenininho)
        this.coracoes    = [];           // lista com todos os corações que foram criados

        if (cena.textures.exists('coracao')) {
            this.criarCoracoes(); // textura já em cache (ex: após scene.restart)
        } else {
            cena.load.image('coracao', 'assets/images/coracao.svg');
            cena.load.once('complete', () => this.criarCoracoes());
            cena.load.start();
        }
    }

    criarCoracoes() {
        for (let i = 0; i < this.vidaMaxima; i++) {
            const posX = this.x + i * this.espacamento; // empurra cada coração um pouco pra direita

            const coracao = this.cena.add.image(posX, this.y, 'coracao');
            coracao.setScale(this.escala);
            coracao.setDepth(100); // fica na frente de tudo

            this.coracoes.push(coracao);
        }

        // espera as fontes carregarem pra não aparecer fonte errada no modal
        document.fonts.ready.then(() => {
            const { width: w, height: h } = this.cena.scale;
            this.modalAviso = new Modal(this.cena, w * 0.70, h * 0.56, 2, 2);
            this.modalAviso.container.setDepth(300);
            this.modalAviso.setPergunta({
                titulo: `ATENÇÃO! \n\nVOCE TEM ${this.vidaMaxima} VIDAS.\n SE PERDER TODAS, O QUIZ REINICIA.`,
                descricao: '',
                textoBotao: 'ENTENDIDO',
                yTitulo: -50,
                yDescricao: 10,
                yBotao: 130,
                fecharAoClicar: false,
                acao: () => {
                    this.modalAviso.hide();
                    this.cena.events.emit('vidasPronto'); // fala pra cena que pode começar
                }
            });
            this.modalAviso.show();
        });
    }

    atualizarCoracoes() {
        // corações que ainda tem vida ficam normais, os perdidos ficam transparentes
        this.coracoes.forEach((coracao, index) => {
            coracao.setAlpha(index < this.vidas ? 1 : 0.25);
        });
    }

    perderVida() {
        if (this.vidas <= 0) return; // já tá sem vida, não faz nada

        this.vidas--;
        this.atualizarCoracoes();

        if (this.vidas === 0) {
            this.semVidas();
        }
    }

    semVidas() {
        const { width, height } = this.cena.scale; // tamanho da tela

        // escurece a tela toda
        const overlay = this.cena.add.rectangle(width * 0.50, height * 0.50, width, height, 0x000000, )
            .setDepth(200);

        const texto = this.cena.add.text(width * 0.50, height * 0.50, 'Sem vidas!\nReiniciando...', {
            fontSize: '32px',
            fontFamily: 'APHONT',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(201);

        // depois de 1,5 segundos reinicia a cena
        this.cena.time.delayedCall(1500, () => {
            overlay.destroy();
            texto.destroy();
            this.cena.time.removeAllEvents(); // cancela timers pendentes (ex: indicePergunta++) antes de reiniciar
            this.cena.scene.restart();
        });
    }
}
