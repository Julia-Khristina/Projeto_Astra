export default class Badge {

    constructor(cena, x, y, imagem) {
        // badge começa oculto até ser desbloqueado pelo jogador
        this.imagemBadge = cena.physics.add.staticImage(x, y, imagem).setScale(0.24);
        this.imagemBadge.setVisible(false);
        this.imagemBadge.setDepth(15);
    }

    ativar() {
        this.imagemBadge.setVisible(true);
    }
}