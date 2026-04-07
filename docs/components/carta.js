export default class Carta { //Slot visual arrastável, expõe o sprite interativo para a cena gerenciar o arraste.
    constructor(scene, grupo, image, positionx, positiony, index) {
        this.scene = scene;
        this.grupo = grupo;
        this.image = image;
        this.positionx = positionx;
        this.positiony = positiony;
        this.index = index;
        this.sprite = null;
    }

    criar(){
        this.sprite = this.grupo.create(this.positionx, this.positiony, this.image).setScale(0.57);
        this.sprite.setInteractive();
        this.sprite.setDepth(15); // Acima da nave (10) e planetas (5), mas abaixo do cientista (11) se necessário ajuste
    }
}