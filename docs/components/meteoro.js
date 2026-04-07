// Gerencia a criação, movimentação e remoção dos meteoros na cena.
export default class Meteoro {

    // T é o tempo total de travessia da tela em segundos.
    constructor(cena, grupo) {
        this.cena = cena;
        this.grupo = grupo;
        this.T = 2.6;
    }

    // Cria um meteoro fora da borda direita com trajetória parabólica até a borda esquerda.
    lancar() {
        const { width, height } = this.cena.scale;

        // Origem aleatória à direita, destino aleatório à esquerda.
        const xi = width + 100;
        const yi = Phaser.Math.Between(height * 0.05, height * 0.95);
        const xf = 100;
        const yf = Phaser.Math.Between(height * 0.1, height * 0.9);

        // Velocidade horizontal constante (MU) e aceleração vertical (MUV).
        const velocidadeX = (xf - xi) / this.T;
        const aceleracaoY = 2 * (yf - yi) / (this.T * this.T);

        const elemento = this.grupo.create(xi, yi, 'meteoro');
        elemento.setScale(0.2);
        elemento.setDepth(5);
        elemento.body.allowGravity = false;

        // Armazena o estado físico individual de cada meteoro.
        elemento.dados = { velocidadeX, velocidadeY: 0, aceleracaoY, T: this.T, tempoDecorrido: 0 };
    }

    // Atualiza a posição de cada meteoro com base nas equações de MU e MUV.
    atualizar(delta) {
        const deltaSegundos = delta / 1000;

        this.grupo.getChildren().forEach(elemento => {
            if (!elemento.dados) return;
            const dados = elemento.dados;
            if (dados.tempoDecorrido >= dados.T) return; // Ignora meteoros que já chegaram ao destino.

            dados.tempoDecorrido += deltaSegundos;

            console.log(`[MU - Eixo X] Velocidade: ${dados.velocidadeX.toFixed(2)}, Posição X: ${elemento.x.toFixed(2)}`);
            console.log(`[MUV - Eixo Y] Aceleração: ${dados.aceleracaoY.toFixed(2)}, Velocidade Y: ${dados.velocidadeY.toFixed(2)}, Posição Y: ${elemento.y.toFixed(2)}`);

            // Atualiza X com velocidade constante e Y com velocidade crescente.
            elemento.x += dados.velocidadeX * deltaSegundos;
            dados.velocidadeY += dados.aceleracaoY * deltaSegundos;
            elemento.y += dados.velocidadeY * deltaSegundos;
        });
    }

    // Remove da memória os meteoros que concluíram a trajetória.
    limparForaDaTela() {
        this.grupo.getChildren().forEach(elemento => {
            if (elemento.dados.tempoDecorrido >= elemento.dados.T) elemento.destroy();
        });
    }
}