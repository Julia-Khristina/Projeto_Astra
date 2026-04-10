import config from '../global/config.js';
import instrucaoCriacaoBase from '../mensagens/instrucao_criacao_base.js';
import Modal from '../components/modal.js';
import Badge from "../components/Badge.js";
import modal_circulo from '../components/modal_circulo.js';
import desafios from '../mensagens/desafios_criacao_base.js';

export default class CriacaoBase extends Phaser.Scene {
    constructor() {
        super("CriacaoBase");
    }

    // carrega todas as imagens da cena
    preload() {
        this.load.image('pause',      'assets/images/botao_pause.svg');
        this.load.image('cenario',    'assets/images/fundo_marte.svg');
        this.load.image('container',  'assets/images/Container.svg');
        this.load.image('carbono',    'assets/images/Carbono.svg');
        this.load.image('poeira',     'assets/images/Poeira.svg');
        this.load.image('painel',     'assets/images/painel_solar.svg');
        this.load.image('gelo',       'assets/images/Gelo.svg');
        this.load.image('energia',    'assets/images/Energia.svg');
        this.load.image('impressora', 'assets/images/impressora_3d.svg');
    }

    create() {

        const { width, height } = this.scale;

        // sistema de pause
        this.pause = this.add.image(width * 0.953, height * 0.902, 'pause').setScale(0.13).setInteractive().setDepth(21);

        this.pause.on('pointerdown', () => {
            this.scene.launch('Pause', { cenaAnterior: 'CriacaoBase' });
            this.scene.sleep();
        });

        // aplica a array instrução ao código
        this.instrucaoCriacaoBase = instrucaoCriacaoBase;
        // chama a array da mensagem da instrução
        this.indicePergunta = 0;

        // índice do desafio atual (0 a 3)
        this.indiceDesafio = 0;
        
        this.ultimoFeedback = '';

        // modal de instrução
        this.modal = new Modal(this, width * 0.625, height * 0.694, 2, 2);

        this.mostrarInstrucao();

        this.events.on('atualizarFonte', () => {
            if (this.modal && this.modal.container && this.modal.container.scene && this.modal.container.visible) {
                this.mostrarInstrucao(); 
            }
            
            if (this.modalFeedback && this.modalFeedback.container && this.modalFeedback.container.scene && this.modalFeedback.container.visible) {
                if (this.ultimoFeedback === 'correto') {
                    this.mostrarFeedbackCorreto(desafios[this.indiceDesafio]);
                } else if (this.ultimoFeedback === 'errado') {
                    this.mostrarFeedbackErrado(desafios[this.indiceDesafio]);
                }
            }
            
            if (this.modalCirculo && this.modalCirculo.container && this.modalCirculo.container.scene && this.modalCirculo.container.visible) {
                this.carregarDesafio(this.indiceDesafio);
            }
        });
        
    }

    mostrarInstrucao() {
        const atual = this.instrucaoCriacaoBase[this.indicePergunta];
        
        const escala = config.fonteEscolhida || 1;

        if (atual.estiloTitulo) {
            atual.estiloTitulo.fontSize = `${Math.round(70 * escala)}px`;
            atual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };
        }
        if (atual.estiloDescricao) {
            atual.estiloDescricao.fontSize = `${Math.round(45 * escala)}px`;
            atual.estiloDescricao.wordWrap = { width: Math.round(1200 * escala) }
        }

        // quando clicar no botão, o modal ficará invisível
        atual.acao = () => {
            this.modal.hide();
            this.dinamica_clique(); // aparecerá a dinâmica de clique de elementos
        };

        // modal estará visível com a mensagem da instrução atualizada
        this.modal.setPergunta(atual);
        this.modal.show();
    }

    dinamica_clique() {

        // variáveis de tamanho de tela
        const { width, height } = this.scale;
        const centerX = width * 0.5;
        const centerY = height * 0.5;

        this.mundo = this.add.container(centerX, centerY);

        // aplica o container (prateleira) a cena
        this.containerImg = this.add.image(width * 0.039, 0, 'container');
        this.containerImg.setOrigin(0.5, 0);
        this.containerImg.setScale(height / this.textures.get('container').getSourceImage().height);
        this.containerImg.setDepth(2);

        // adiciona a imagem do cenário
        this.cenarioImg = this.add.image(0, 0, 'cenario');
        this.cenarioImg.setDisplaySize(width, height);
        this.mundo.add(this.cenarioImg); // aplica o cenário ao mundo

        const badgeKeys = ['carbono', 'poeira', 'painel', 'gelo', 'energia', 'impressora'];
        const totalBadges = badgeKeys.length;
        const slotHeight = height / totalBadges;

        // lista com os badges (elementos coletáveis) já organizados no container
        this.listaBadges = [
            this.carbono = new Badge(this, width * 0.039, slotHeight * 0 + slotHeight * 0.5, 'carbono'),
            this.poeira = new Badge(this, width * 0.039, slotHeight * 1 + slotHeight * 0.5, 'poeira'),
            this.painel = new Badge(this, width * 0.039, slotHeight * 2 + slotHeight * 0.5, 'painel'),
            this.gelo = new Badge(this, width * 0.039, slotHeight * 3 + slotHeight * 0.5, 'gelo'),
            this.impressora = new Badge(this, width * 0.039, slotHeight * 4 + slotHeight * 0.5, 'impressora'),
            this.energia = new Badge(this, width * 0.039, slotHeight * 5 + slotHeight * 0.5, 'energia'),
        ];

        // configuração dos badges
        this.listaBadges.forEach(badge => {
            badge.ativar(); // já aparecem ativados
            badge.imagemBadge.setScale(0.1); // escala dos elementos 
            badge.imagemBadge.setDepth(10); // estão nas primeiras camadas de visualização
            badge.imagemBadge.setInteractive(); // estão disponíveis para a interação com mouse

            // cada badge avisa a cena quando é clicado
            // textura = "nome da imagem"
            badge.imagemBadge.on('pointerdown', () => {
                const chave = badge.imagemBadge.texture.key; // armazena a chave direto da textura
                console.log('badge clicado:', chave);
                this.onBadgeClicado(chave);
            });
        });

        // modal de feedback - correto/errado
        this.modalFeedback = new Modal(this, width * 0.625, height * 0.694, 2, 2);

        // cria o modal de círculos e carrega o primeiro desafio
        this.modalCirculo = new modal_circulo(this, '');
        this.modalCirculo.create();
        this.carregarDesafio(this.indiceDesafio);

        const mensagemCarbono = this.add.text(0, 0, 'Carbono', {
            fontFamily: 'APHONT',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333333', // Fundo escuro para destacar
        });

        mensagemCarbono.setVisible(false);
        mensagemCarbono.setDepth(100);

        this.carbono.imagemBadge.on('pointerover', (pointer) => {
            mensagemCarbono.setVisible(true);
            mensagemCarbono.setPosition(width * 0.09, slotHeight * 0 + slotHeight * 0.48);
        });

        this.carbono.imagemBadge.on('pointerout', () => {
        mensagemCarbono.setVisible(false);
        });

        const mensagemPoeira = this.add.text(0, 0, 'Poeira', {
            fontFamily: 'APHONT',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333333', // Fundo escuro para destacar
        });

        mensagemPoeira.setVisible(false);
        mensagemPoeira.setDepth(100);

        this.poeira.imagemBadge.on('pointerover', (pointer) => {
            mensagemPoeira.setVisible(true);
            mensagemPoeira.setPosition(width * 0.09, slotHeight * 1 + slotHeight * 0.48);
        });

        this.poeira.imagemBadge.on('pointerout', () => {
        mensagemPoeira.setVisible(false);
        });

        const mensagemPainel = this.add.text(0, 0, 'Painel Solar', {
            fontFamily: 'APHONT',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333333', // Fundo escuro para destacar
        });

        mensagemPainel.setVisible(false);
        mensagemPainel.setDepth(100);

        this.painel.imagemBadge.on('pointerover', (pointer) => {
            mensagemPainel.setVisible(true);
            mensagemPainel.setPosition(width * 0.09, slotHeight * 2 + slotHeight * 0.48);
        });

        this.painel.imagemBadge.on('pointerout', () => {
        mensagemPainel.setVisible(false);
        });

        const mensagemGelo = this.add.text(0, 0, 'Gelo', {
            fontFamily: 'APHONT',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333333', // Fundo escuro para destacar
        });

        mensagemGelo.setVisible(false);
        mensagemGelo.setDepth(100);

        this.gelo.imagemBadge.on('pointerover', (pointer) => {
            mensagemGelo.setVisible(true);
            mensagemGelo.setPosition(width * 0.09, slotHeight * 3 + slotHeight * 0.48);
        });

        this.gelo.imagemBadge.on('pointerout', () => {
        mensagemGelo.setVisible(false);
        });

        const mensagemImpressora = this.add.text(0, 0, 'Impressora 3D', {
            fontFamily: 'APHONT',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333333', // Fundo escuro para destacar
        });

        mensagemImpressora.setVisible(false);
        mensagemImpressora.setDepth(100);

        this.impressora.imagemBadge.on('pointerover', (pointer) => {
            mensagemImpressora.setVisible(true);
            mensagemImpressora.setPosition(width * 0.09, slotHeight * 4 + slotHeight * 0.48);
        });

        this.impressora.imagemBadge.on('pointerout', () => {
        mensagemImpressora.setVisible(false);
        });

        const mensagemEnergia = this.add.text(0, 0, 'Energia', {
            fontFamily: 'APHONT',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333333', // Fundo escuro para destacar
        });

        mensagemEnergia.setVisible(false);
        mensagemEnergia.setDepth(100);

        this.energia.imagemBadge.on('pointerover', (pointer) => {
            mensagemEnergia.setVisible(true);
            mensagemEnergia.setPosition(width * 0.09, slotHeight * 5 + slotHeight * 0.48);
        });

        this.energia.imagemBadge.on('pointerout', () => {
        mensagemEnergia.setVisible(false);
        });
    }

    // Carrega o desafio pelo índice 

    carregarDesafio(indice) {
        const desafio = desafios[indice];

        // atualiza o título do modal de círculos
        this.modalCirculo.setTitulo(desafio.titulo);
        this.modalCirculo.resetar();
        this.modalCirculo.setVisible(true);
    }

    // Badge clicado no container 

    onBadgeClicado(chave) {
        // aceita clique se o modal de círculos estiver visível
        if (!this.modalCirculo.container?.visible) return;

        this.modalCirculo.receberBadge(chave);
    }

    // após clicar em enviar

    onEnviarDesafio(chave1, chave2) {
        const desafio = desafios[this.indiceDesafio];
        const respostas = [chave1, chave2];

        // verifica se as duas chaves estão na resposta correta 
        const acertou = desafio.respostaCorreta.every(r => respostas.includes(r));

        // modal de círculos invisível durante o feedback
        this.modalCirculo.setVisible(false);

        if (acertou) {
            this.mostrarFeedbackCorreto(desafio);
        } else {
            this.mostrarFeedbackErrado(desafio);
        }
    }

    // Feedback correto

    // chama o modal de feedback com a mensagem referente ao index do desafio
    mostrarFeedbackCorreto(desafio) {
        this.ultimoFeedback = 'correto';
        
        const escala = config.fonteEscolhida || 1;

        this.modalFeedback.setPergunta({
            titulo: 'ESTÁ CORRETO! ✓',
            descricao: desafio.descricaoConsequencia,
            botao: 'Vamos continuar!',
            estiloTitulo: {
                fontSize: `${Math.round(70 * escala)}px`,
                wordWrap: { width: Math.round(1100 * escala) }
            },
            estiloDescricao: {
                fontSize: `${Math.round(50 * escala)}px`
            },
            acao: () => {
                // quando fechar o modal é somado 1 ao index anterior para que apareça o próximo
                this.modalFeedback.hide();
                this.indiceDesafio++;

                if (this.indiceDesafio < desafios.length) {
                    // carrega o próximo desafio
                    this.carregarDesafio(this.indiceDesafio);
                } else {
                    // todos os desafios concluídos =  avança de cena
                    this.scene.start('fimMarte');
                }
            }
        });

        this.modalFeedback.show();
    }

    // Feedback errado

    // chama o modal de feedback com a mensagem referente ao index do desafio
    mostrarFeedbackErrado(desafio) {
        this.ultimoFeedback = 'errado';
        
        const escala = config.fonteEscolhida || 1;

        this.modalFeedback.setPergunta({
            titulo: 'ESTÁ ERRADO! ✗',
            descricao: desafio.descricaoConsequencia,
            botao: 'Vamos refazer!',
            estiloTitulo: {
                fontSize: `${Math.round(70 * escala)}px`,
                wordWrap: { width: Math.round(1100 * escala) }
            },
            estiloDescricao: {
                fontSize: `${Math.round(50 * escala)}px`
            },
            // o jogador terá que responder novamente ao desafio
            acao: () => {
                this.modalFeedback.hide();
                this.carregarDesafio(this.indiceDesafio);
            }
        });

        this.modalFeedback.show();
    }
}