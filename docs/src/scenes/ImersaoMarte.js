import config from '../global/config.js';
import Badge from "../components/Badge.js";
import Modal from "../components/modal.js";
import explicacao from "../mensagens/modal_imersao.js";

export default class ImersaoMarte extends Phaser.Scene
{
    constructor()
    {
        super("ImersaoMarte"); 
    }

    preload() {
        this.load.image('lente',     'assets/images/Telescópio_de_Marte.svg');
        this.load.image('cenario',   'assets/images/Fundo_Marte_Gelo.svg');
        this.load.image('container', 'assets/images/Container.svg');
        this.load.image('carbono',   'assets/images/Carbono.svg');
        this.load.image('poeira',    'assets/images/Poeira.svg');
        this.load.image('rocha',     'assets/images/Rocha.svg');
        this.load.image('gelo',      'assets/images/Gelo.svg');
        this.load.image('energia',   'assets/images/Energia.svg');
        this.load.image('cinza',     'assets/images/Cinza_Vulcânica.svg');
        this.load.image('pause',     'assets/images/botao_pause.svg');

        this.load.audio('ACinza',   'assets/sounds/Audio_Cinza.mp3');
        this.load.audio('ACO2',     'assets/sounds/Audio_CO2.mp3');
        this.load.audio('AEnergia', 'assets/sounds/Audio_Energia.mp3');
        this.load.audio('AGelo',    'assets/sounds/Audio_Gelo.mp3');
        this.load.audio('APoeira',  'assets/sounds/Audio_Poeira.mp3');
        this.load.audio('ARocha',   'assets/sounds/Audio_Rocha.mp3');
    }

    create()
    {
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;

        // nenhum áudio está ativo ao iniciar a cena
        this.audioAtual = null;
        
        // sistema de pause
        this.pause = this.add.image(width * 0.953, height * 0.902, 'pause').setScale(0.13).setInteractive().setDepth(21);

        // se o botão de pause for clicado
        this.pause.on('pointerdown', () => {
            // para todos os áudios
            this.sound.pauseAll();
            // "Dorme" a cena e guarda o valor cenaAnterior com o nome da cena atual
            this.scene.launch('Pause', { cenaAnterior: 'ImersaoMarte' });
            this.scene.sleep();
        });

        // container lateral de badges 
        this.container = this.add.image(width * 0.08, height * 0.49, 'container');
        this.container.setScale(0.9);
        this.container.setDepth(2);

        // cenário + coletáveis
        this.mundo = this.add.container(centerX, centerY);

        const image = this.add.image(0, 0, 'cenario');
        image.setScale(1.35);
        this.mundo.add(image);

        // coletáveis posicionados na cena
        const carbono = this.add.image( width *  0.25, -height * 0.8,  'carbono');
        carbono.setScale(0.3);

        const poeira  = this.add.image(-width *  0.3,  -height * 0.6,  'poeira');
        poeira.setScale(0.3);

        const rocha   = this.add.image( width *  0.11, -height * 0.08, 'rocha');
        rocha.setScale(0.3);

        const gelo    = this.add.image( width *  0.06,  height * 0.8,  'gelo');
        gelo.setScale(0.15);

        const energia = this.add.image(-width *  0.30,  height * 0.22, 'energia');
        energia.setScale(0.3);

        const cinza   = this.add.image( width *  0.45,  height * 0.15, 'cinza');
        cinza.setScale(0.2);

        this.mundo.add([carbono, poeira, rocha, gelo, energia, cinza]);

        // máscara circular 
        const shape = this.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.arc(centerX, centerY, height * 0.65, 0, Math.PI * 2);
        shape.fillPath();

        const mask = shape.createGeometryMask();
        image.setMask(mask);

        // lente 
        const lente = this.add.image(centerX, centerY, 'lente');
        lente.setScale(0.67);
        lente.y -= height * 0.11;
        lente.x += width  * 0.06;
        lente.setDepth(1);

        this.input.on('pointermove', (pointer) => {
            if (this.modalAberto) return;

            const intensidade = 0.9;
            this.mundo.x = centerX + (centerX - pointer.x) * intensidade;
            this.mundo.y = centerY + (centerY - pointer.y) * intensidade;
        });

        // Badges 
        this.listaAcertos = [false, false, false, false, false, false];

        // Posições dos badges na prateleira
        const badgeX      = width * 0.08;
        const badgeStartY = height * 0.13;
        const badgeGapY   = height * 0.14;

        this.listaBadges = [
            new Badge(this, badgeX, badgeStartY + badgeGapY * 0, 'carbono'),
            new Badge(this, badgeX, badgeStartY + badgeGapY * 1, 'poeira'),
            new Badge(this, badgeX, badgeStartY + badgeGapY * 2, 'rocha'),
            new Badge(this, badgeX, badgeStartY + badgeGapY * 3, 'gelo'),
            new Badge(this, badgeX, badgeStartY + badgeGapY * 4, 'energia'),
            new Badge(this, badgeX, badgeStartY + badgeGapY * 5, 'cinza'),
        ];

        this.listaBadges.forEach(badge => {
            badge.imagemBadge.setDepth(10);
            badge.imagemBadge.setScale(0.08);
        });

        // Modal 
        this.modalAberto = false;
        this.modal = new Modal(this, centerX, centerY, 2, 2);
        this.modal.visible = false;

        const hideSlowOriginal = this.modal.hide_slow.bind(this.modal);
        this.modal.hide_slow = () => {
            hideSlowOriginal();
            this.time.delayedCall(400, () => {
                this.modalAberto = false;
                this.tweens.add({
                    targets: this.mundo,
                    x: centerX,
                    y: centerY,
                    duration: 300,
                    ease: 'Power2'
                });
            });
        };

        // audio coletáveis 
        const coletaveis = [
            { objeto: carbono, audio: 'ACO2',     index: 0 },
            { objeto: poeira,  audio: 'APoeira',  index: 1 },
            { objeto: rocha,   audio: 'ARocha',   index: 2 },
            { objeto: gelo,    audio: 'AGelo',    index: 3 },
            { objeto: energia, audio: 'AEnergia', index: 4 },
            { objeto: cinza,   audio: 'ACinza',   index: 5 },
        ];

        coletaveis.forEach(({ objeto, audio, index }) => {
            objeto.setInteractive();

            objeto.on('pointerdown', () => {
                const escala = config.fonteEscolhida || 1;

                explicacao[index].estiloTitulo.fontSize    = `${Math.round(80 * escala)}px`;
                explicacao[index].estiloDescricao.fontSize = `${Math.round(40 * escala)}px`;
                explicacao[index].estiloTitulo.wordWrap    = { width: Math.round(1100 * escala) };

                // registra o áudio atual para ser retomado ao ligar o som
                this.audioAtual = audio;
                // termina qualquer áudio anterior e começa a tocar o áudio deste elemento
                if (config.somAtivo) {
                    this.sound.stopAll();
                    this.sound.play(audio, { volume: 0.5 });
                }

                explicacao[index].acao = () => {
                    if (!this.listaAcertos[index]) {
                        this.listaBadges[index].ativar();
                        this.listaAcertos[index] = true;
                    }
                    // termina o áudio ao fechar o modal, sempre
                    if (config.somAtivo) this.sound.stopByKey(audio);
                    this.verificarConclusao();
                };

                this.modalAberto = true;
                this.modal.setPergunta(explicacao[index]);
                this.modal.show();
            });
        });

        // verifica se todos os badges foram coletados
        this.verificarConclusao = () => {
            const todosColetados = this.listaAcertos.slice(0, 6).every(v => v === true);
            if (todosColetados) {
                this.time.delayedCall(800, () => {
                    this.sound.stopAll();
                    this.scene.start('CriacaoBase');
                });
            }
        };

        // evento de após o pause, a cena "acorda"
        this.events.on('wake', () => {
            // se o som estiver ativo
            if (config.somAtivo) {
                // retoma todos os sons que estavam pausados
                this.sound.resumeAll();
                // verifica se o áudio está tocando
                const som = this.sound.get(this.audioAtual);
                // se houver um áudio registrado e ele não estiver tocando, inicia novamente
                if (this.audioAtual && (!som || !som.isPlaying)) {
                    this.sound.play(this.audioAtual, { volume: 0.5 });
                }
            }
        });
    }
}