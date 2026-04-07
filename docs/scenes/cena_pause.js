import Botao from '../components/botoes.js';
import config from '../global/config.js';

export default class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'Pause' });
    }

    preload () {

    }

    create (data) {
        const { width, height } = this.scale;
        this.cenaAnterior = data?.cenaAnterior;

        this.overlay = this.add.rectangle(width * 0.5, height * 0.5, width, height, 0x0A0D30, 1);
         //retângulo que sempre aparece
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRoundedRect(width * 0.1, height * 0.083, width * 0.8, height * 0.833, 32); 

        //tela 1 de opções de configuração: som, fonte e voltar.
        this.fonte = new Botao(this, 360, width * 0.35, height * 0.4, 'FONTE');
        this.som = new Botao(this, 360,  width * 0.65, height * 0.4, 'SOM');
        this.telaCheia = new Botao(this, 360, width * 0.35, height * 0.6, 'TELA CHEIA');
        this.reiniciar = new Botao(this, 360, width * 0.65, height * 0.6, 'REINICIAR JOGO');
        this.voltar = new Botao(this, 360, width * 0.50, height * 0.78, 'VOLTAR');

        //tela 2 de opções de som: ligado, desligado e voltar.
        this.voltar2 = new Botao(this, 360, width * 0.5, height * 0.806, 'VOLTAR');
        this.ligado = new Botao(this, 260, width * 0.333, height * 0.5, 'LIGADO');
        this.desligado = new Botao(this, 260, width * 0.675, height * 0.5, 'DESLIGADO');

        //tela 3 de opções de tamanho de fonte: pequeno, médio, grande e voltar. 
        this.voltar3 = new Botao(this, 360, width * 0.5, height * 0.806, 'VOLTAR');
        this.pequeno = new Botao(this, 260, width * 0.25, height * 0.529, 'PEQUENO');
        this.medio = new Botao(this, 260, width * 0.5, height * 0.529, 'MÉDIO');
        this.grande = new Botao(this, 260, width * 0.75, height * 0.529, 'GRANDE');

        //titulo da primeira tela
        this.texto1 = this.add.text(width * 0.5, height * 0.238, 'CONFIGURAÇÕES', {
            fontSize: `${Math.round(38 * config.fonteEscolhida)}px`, 
            //tamanho do texto.
            fill: '#000000',
            //alinhamento do texto.
            align: 'center',
            //linha invisível para não ser ultrapassada pelo texto.
            fontFamily: 'APHONT',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        //titulo da segunda tela
        this.texto2 = this.add.text(width * 0.5, height * 0.208, 'SOM', {
            fontSize: `${Math.round(38 * config.fonteEscolhida)}px`, 
            //tamanho do texto.
            fill: '#000000',
            //alinhamento do texto.
            align: 'center',
            //linha invisível para não ser ultrapassada pelo texto.
            fontFamily: 'APHONT',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        //titulo da terceira tela
        this.texto3 = this.add.text(width * 0.5, height * 0.138, 'FONTE', {
            fontSize: `${Math.round(38 * config.fonteEscolhida)}px`, 
            //tamanho do texto.
            fill: '#000000',
            //alinhamento do texto.
            align: 'center',
            //linha invisível para não ser ultrapassada pelo texto.
            fontFamily: 'APHONT',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        //subtitulo da terceira tela
        this.texto4 = this.add.text(width * 0.359, height * 0.347, 'TAMANHO DA FONTE:', {
            fontSize: `${Math.round(38 * config.fonteEscolhida)}px`, 
            //tamanho do texto.
            fill: '#000000',
            //alinhamento do texto.
            align: 'center',
            //linha invisível para não ser ultrapassada pelo texto.
            fontFamily: 'APHONT',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        //ação subsequente do clique
        this.telaCheia.caixa.on('pointerdown', () => {
            //Coloca a tela como cheia
            this.scale.toggleFullscreen();
        });

        //ação subsequente do clique
        this.som.caixa.on('pointerdown', () =>{
            //fecha a tela 1
            this.mostrarTela1(false);
            //abre a tela 2
            this.mostrarTela2(true);
        })

        //ação subsequente do clique
        this.reiniciar.caixa.on('pointerdown', () =>{
            //volta para a cena 1
            this.scene.start("BemVindo");
        })

        //ação subsequente do clique
        this.fonte.caixa.on('pointerdown', () =>{
            //tela 1 fechada
            this.mostrarTela1(false);
            //tela 2 fechada
            this.mostrarTela2(false);
            //tela 3 aberta
            this.mostrarTela3(true);
        })

        //ação subsequente do clique
        this.voltar2.caixa.on('pointerdown', () =>{
            //tela 1 aberta
            this.mostrarTela1(true);
            //tela 2 fechada
            this.mostrarTela2(false);
        })

        //ação subsequente do clique
        this.voltar3.caixa.on('pointerdown', () =>{
            //tela 1 aberta
            this.mostrarTela1(true);
            //tela 2 fechada
            this.mostrarTela2(false);
            //tela 3 fechada
            this.mostrarTela3(false);
        })

        //ação subsequente do clique
        this.pequeno.caixa.on('pointerdown', () =>{
            //atribui o valor do config.FonteEscolhida no global para todas a cenas igual a 0.75
            config.fonteEscolhida = 0.75;
            //sai da cena pause
            this.scene.stop('Pause');
            //acorda a cena anterior que foi clicado o botão de pause
            this.scene.wake(this.cenaAnterior);
            //emite a função atualizarFonte para a cena anterior
            this.scene.get(this.cenaAnterior).events.emit('atualizarFonte');
        })

        //ação subsequente do clique
        this.medio.caixa.on('pointerdown', () =>{
            //atribui o valor do config.FonteEscolhida no global para todas a cenas igual a 1
            config.fonteEscolhida = 1;
            //sai da cena pause
            this.scene.stop('Pause');
            //acorda a cena anterior que foi clicado o botão de pause
            this.scene.wake(this.cenaAnterior);
            //emite a função atualizarFonte para a cena anterior
            this.scene.get(this.cenaAnterior).events.emit('atualizarFonte');
        })

        //ação subsequente do clique
        this.grande.caixa.on('pointerdown', () =>{
            //atribui o valor do config.FonteEscolhida no global para todas a cenas igual a 1.25
            config.fonteEscolhida = 1.25;
            //sai da cena pause
            this.scene.stop('Pause');
            //acorda a cena anterior que foi clicado o botão de pause
            this.scene.wake(this.cenaAnterior);
            //emite a função atualizarFonte para a cena anterior
            this.scene.get(this.cenaAnterior).events.emit('atualizarFonte');
        })
        
        //ação subsequente do clique
        this.voltar.caixa.on('pointerdown', () => {
            //sai da cena pause
            this.scene.stop('Pause');
            //acorda a cena anterior que foi clicado o botão de pause
            this.scene.wake(this.cenaAnterior);
            //emite a função atualizarFonte para a cena anterior
            this.scene.get(this.cenaAnterior).events.emit('atualizarFonte');
        });

        //ação subsequente do clique
        this.ligado.caixa.on('pointerdown', () =>{
            //atribui o valor do config.somAtivo no global para todas a cenas igual a true
            config.somAtivo = true;
        });

        //ação subsequente do clique
        this.desligado.caixa.on('pointerdown', () =>{
            //atribui o valor do config.somAtivo no global para todas a cenas igual a false
            config.somAtivo = false;
            //Para todos os áudios
            this.sys.game.sound.pauseAll();
        });

        //containers que representam as telas 1, 2 e 3. Com cada botão em cada tela representada pela caixa e botao para virarem um conjunto só de elementos. 
        this.tela1 = this.add.container(0, 0, [this.som.caixa, this.som.botao, this.telaCheia.caixa, this.telaCheia.botao, this.fonte.caixa, this.fonte.botao, this.reiniciar.caixa, this.reiniciar.botao, this.voltar.caixa, this.voltar.botao, this.texto1]);
        this.tela2 = this.add.container(0, 0, [this.ligado.caixa, this.ligado.botao, this.desligado.caixa, this.desligado.botao, this.voltar2.caixa, this.voltar2.botao, this.texto2]);
        this.tela3 = this.add.container(0, 0, [this.pequeno.caixa, this.pequeno.botao, this.medio.caixa, this.medio.botao, this.grande.caixa, this.grande.botao, this.voltar3.caixa, this.voltar3.botao, this.texto3, this.texto4]);

        this.mostrarTela1(true);
        this.mostrarTela2(false);
        this.mostrarTela3(false);
        
    }

        //Função para os elementos da tela 1 serem mostrados ou não
        mostrarTela1(mostrar) {
            this.tela1.setVisible(mostrar);

        }
        //Função para os elementos da tela 2 serem mostrados ou não
        mostrarTela2(visivel) {
            this.tela2.setVisible(visivel);

        }
        //Função para os elementos da tela 3 serem mostrados ou não
        mostrarTela3(show) {
            this.tela3.setVisible(show);
        }
        
}