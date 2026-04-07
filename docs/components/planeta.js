import Modal from './modal.js';

export class Planeta {
    constructor(cena, x, y, chave, escalaBase = 0.2) {
        this.cena = cena;
        this.escalaBase = escalaBase;

        // Sprite interativo
        this.imagemPlaneta = cena.add.image(x, y, chave)
            .setInteractive({ useHandCursor: true })
            .setScale(escalaBase)
            .setDepth(5); // Um pouco acima do fundo, mas abaixo da UI

        // Efeito de Hover (Aumentar)
        this.imagemPlaneta.on('pointerover', () => {
            // Remove tweens ativos para evitar conflito de escala
            cena.tweens.killTweensOf(this.imagemPlaneta);
            
            cena.tweens.add({
                targets: this.imagemPlaneta,
                scale: escalaBase * 1.2, // 20% de aumento é mais sutil e elegante
                duration: 200,
                ease: 'Power2'
            });
        });

        // Efeito de Out (Restaurar)
        this.imagemPlaneta.on('pointerout', () => {
            cena.tweens.killTweensOf(this.imagemPlaneta);

            cena.tweens.add({
                targets: this.imagemPlaneta,
                scale: escalaBase,
                duration: 200,
                ease: 'Power2'
            });
        });
    }
}

export class Terra extends Planeta {
    constructor(cena, x, y) {
        // Chamando o super com a chave 'terra' e definindo a escala específica aqui se necessário
        super(cena, x, y, 'terra', 0.25); 

        // Clique na Terra inicia o tutorial
        this.imagemPlaneta.on('pointerdown', () => {
            // Pequeno feedback visual ao clicar antes de mudar de cena
            this.cena.tweens.add({
                targets: this.imagemPlaneta,
                scale: this.escalaBase * 0.9,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.cena.scene.start('Tutorial');
                }
            });
        });
    }
}