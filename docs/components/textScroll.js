// Caixa de texto com scroll ativado pelo movimento do mouse na zona interativa.
import config from '../global/config.js';
export default class TextScroll {
    constructor(scene, x, y, texto, largura, altura) {
        this.scrollY    = 0;
        this.velocidade = 2.0;
        this.direcao    = 0;
        this.largura    = largura;

        const style = { 
            fontSize: `${Math.round(42 * config.fonteEscolhida)}px`, 
            fontFamily: 'APHONT',
            fontStyle: 'bold',
            color: '#0A0A0A',
            wordWrap: { width: largura, useAdvancedWrap: true },
            lineSpacing: 10
        };

        this.container = scene.add.container(x, y);
        this.textoObjeto = scene.add.text(0, 0, texto, style);
        this.container.add(this.textoObjeto);

        this.alturaTotal = this.textoObjeto.height;

        // Máscara que recorta o texto ao tamanho visível do componente.
        const maskShape = scene.add.graphics();
        maskShape.fillRect(x, y, largura, altura);
        this.container.setMask(maskShape.createGeometryMask());

        // Define a direção do scroll com base na posição vertical do cursor.
        this.zona = scene.add.zone(x, y, largura, altura)
            .setOrigin(0)
            .setInteractive()
            .on('pointermove', p => {
                const rel = (p.y - y) / altura;
                if (rel < 0.4) this.direcao = -1;
                else if (rel > 0.6) this.direcao =  1;
                else this.direcao =  0;
            })
            .on('pointerout', () => this.direcao = 0);

        // A cada frame, move o container respeitando os limites do conteúdo.
        scene.events.on('update', () => {
            if (this.direcao === 0) return;

            const maxScroll = Math.max(0, this.alturaTotal - altura);
            
            this.scrollY = Phaser.Math.Clamp(
                this.scrollY + this.velocidade * this.direcao, 
                0, 
                maxScroll
            );

            this.container.setY(y - this.scrollY);
        });
    }

    // Mostra ou oculta o componente inteiro.
    setVisivel(mostrar) {
        this.container.setVisible(mostrar);
        this.zona.setVisible(mostrar);
    }

    // Reaplica o tamanho da fonte conforme a preferência do usuário em config.
    atualizarTamanhoFonte() { 
        const escala = config.fonteEscolhida || 1;
        this.textoObjeto.setFontSize(`${Math.round(42 * escala)}px`);
        this.alturaTotal = this.textoObjeto.height;
        this.textoObjeto.setWordWrapWidth(this.largura);
    } 
}