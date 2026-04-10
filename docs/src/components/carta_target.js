export default class Carta_Target { //Slot visual sem lógica própria, expõe apenas o sprite para a cena manipular.
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
        this.sprite = this.grupo.create(this.positionx, this.positiony, this.image).setScale(0.72);
        this.sprite.setDepth(14); // Logo abaixo da Carta arrastável (15) para permitir a sobreposição
    }
}