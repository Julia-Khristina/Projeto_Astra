export default class Nave {

    constructor(cena) {
        this.cena = cena;
        const { width, height } = cena.scale;

        // sprite da nave começa oculto até a fase iniciar
        this.sprite = cena.physics.add.image(width * 0.117, height * 0.416, 'nave');
        this.sprite.setScale(0.18);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setVisible(false);
        this.sprite.setDepth(10);
        this.sprite.angle = 50;
        this.vx = 0;
        this.vy = 0;
        this.tempo = 0;
    }

    mostrar() {
        const { width, height } = this.cena.scale;
        this.sprite.setPosition(width * 0.117, height * 0.416);
        this.sprite.setVisible(true);
    }

    seguirMouse(posicaoFinalX, posicaoFinalY, delta) {
        const posicaoInicialX = this.sprite.x;
        const posicaoInicialY = this.sprite.y
        const dx = posicaoFinalX - posicaoInicialX;
        const dy = posicaoFinalY - posicaoInicialY;
        const distanciaX = Math.abs(dx);
        const distanciaY = Math.abs(dy);

        const aceleracao = 2.3;
        const velocidadeMax = 23;
        const limiteParada = 4;
        const velocidadeMaxY = 30;
        const órbita = 0.35;

        const emMovimento = distanciaX >= limiteParada || distanciaY >= limiteParada;
 
        if (emMovimento) {
            this.tempo += delta/1000;
        } else {
            this.tempo = 0;
        }


        if (distanciaY < limiteParada) {
            this.sprite.y = posicaoFinalY;
            this.vy = 0;
        } else {
            const direcaoY = dy / distanciaY;
            const velocidadeY = Math.min(velocidadeMaxY, distanciaY * 0.15);
            this.sprite.y += direcaoY * velocidadeY;

        }

        if (distanciaX < limiteParada) {
            this.sprite.x = posicaoFinalX;
            this.vx = 0;
        } else {
            const direcaoX = dx / distanciaX;
            const aceleracaoComOrbita = aceleracao * (direcaoX < 0 ? 1 + órbita : 1 - órbita);
            const velocidadeLimitada = Math.min(velocidadeMax, distanciaX * 0.15);
            this.vx += direcaoX * aceleracaoComOrbita;
            this.vx = Math.max(-velocidadeLimitada, Math.min(velocidadeLimitada, this.vx));
            this.sprite.x += this.vx;
        }
    }
}