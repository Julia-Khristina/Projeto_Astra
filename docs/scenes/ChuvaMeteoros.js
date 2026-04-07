import Nave from '../components/nave.js';
import Meteoro from '../components/meteoro.js';

export default class ChuvaMeteoros extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.jogoAtivo = false;
    }

    preload() {
        this.load.image('nave',    'assets/images/nave.png');
        this.load.image('meteoro', 'assets/images/meteoro.png');
    }

    create() {
        this.meteoros = this.physics.add.group();
        this.nave = new Nave(this);
        this.nave.sprite.setDepth(10);

        this.gerenciadorMeteoro = new Meteoro(this, this.meteoros);

        this.physics.add.overlap(
            this.nave.sprite,
            this.meteoros,
            (nave, meteoro) => this.aoColidir(nave, meteoro),
            null,
            this
        );

        this.comecarChuva();
    }

    comecarChuva() {
        this.jogoAtivo = true;
        this.physics.world.resume();
        this.nave.sprite.setVisible(true);
        this.nave.sprite.setDepth(10);

        this.timerMeteoros = this.time.addEvent({
            delay: 1650,
            callback: () => {
                if (this.jogoAtivo) {
                    this.gerenciadorMeteoro.lancar();
                }
            },
            loop: true
        });
    }

    pararChuva() {
        this.jogoAtivo = false;
        this.physics.world.pause();
        if (this.timerMeteoros) {
            this.timerMeteoros.remove();
        }
    }

    update(time, delta) {
        if (this.jogoAtivo) {
            this.nave.seguirMouse(this.input.x, this.input.y, delta);
            this.gerenciadorMeteoro.atualizar(delta);
            this.gerenciadorMeteoro.limparForaDaTela();
        }
    }

    aoColidir(nave, meteoro) {
        meteoro.destroy();
    }
}