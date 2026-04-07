// Importa a configuração global (ex: tamanho de fonte escolhido pelo usuário)
import config from '../global/config.js';
// Importa o array com as instruções exibidas na lousa (modal introdutório da cena)
import instrucaoLousa from '../mensagens/instrucao_lousa.js';
// Importa o componente reutilizável de modal (janela de diálogo/instrução)
import Modal from '../components/modal.js';
// Importa o componente reutilizável de slide (apresentação de conteúdo em páginas)
import Slide from '../components/slide.js';

// Cena AnosLuz — apresenta conteúdo educativo sobre
// Unidade Astronômica (UA) e Ano-Luz em formato de slides.
// Estende Phaser.Scene, seguindo o padrão de cenas do framework Phaser 3.
export default class AnosLuz extends Phaser.Scene {
    constructor() {
        // Registra a cena no Phaser com a chave 'AnosLuz',
        // usada para iniciar ou referenciar esta cena em outras partes do jogo
        super({ key: 'AnosLuz' });
    }

    // Fase de carregamento de assets.
    // Executada automaticamente pelo Phaser antes do create().
    // Todos os recursos (imagens, áudio) são carregados aqui para
    // garantir que estejam disponíveis quando a cena iniciar.
    preload() {
        this.load.image('direita',   'assets/images/seta_direita.png');    // seta de navegação para o próximo slide
        this.load.image('esquerda',  'assets/images/seta_esquerda.png');   // seta de navegação para o slide anterior
        this.load.image('cientista', 'assets/images/cientista-frente.svg'); // personagem decorativo da cena
        this.load.image('pause',     'assets/images/botao_pause.svg');     // botão de pausa
        this.load.audio('audioUa',   'assets/sounds/Audio_Ua.mp3');        // narração do conteúdo de UA e Ano-Luz
    }

    // Fase de criação da cena.
    // Executada automaticamente após o preload().
    // Aqui os elementos visuais e interativos são instanciados e posicionados.
    create() {
        // Obtém as dimensões atuais da tela para posicionamento responsivo
        const { width, height } = this.scale;

        // Adiciona o personagem "cientista" no canto inferior direito da tela
        this.add.image(width * 0.918, height * 0.972, 'cientista')
            .setScale(0.8)  // reduz o tamanho para 80% do original
            .setDepth(11);  // define a camada de renderização (fica na frente de outros elementos)

        // Adiciona o botão de pause no canto superior direito
        this.pause = this.add.image(width * 0.90, height * 0.166, 'pause')
            .setScale(0.13)     // tamanho reduzido
            .setInteractive()   // habilita eventos de clique/toque
            .setDepth(20);      // camada alta para ficar acima de tudo

        // Ao clicar no botão de pause:
        this.pause.on('pointerdown', () => {
            this.sound.pauseAll(); // pausa todos os sons em execução
            // lança a cena de Pause em paralelo, passando o nome da cena atual
            // para que o Pause saiba para onde retornar
            this.scene.launch('Pause', { cenaAnterior: 'AnosLuz' });
            this.scene.sleep(); // coloca a cena AnosLuz em modo de espera (sem destruí-la)
        });

        // Conteúdo textual completo exibido nos slides.
        // Cada bloco separado por \n\n representa um novo parágrafo/tópico.
        const textoSlide = 'O QUE É A UNIDADE ASTRONÔMICA (UA)?\n\nÉ A DISTÂNCIA MÉDIA ENTRE A TERRA E O SOL: CERCA DE 150 MILHÕES DE KM.\n\nUSADA PARA TORNAR OS CÁLCULOS DENTRO DO SISTEMA SOLAR MAIS PRÁTICOS.\n\nAPLICADA PARA MEDIR ÓRBITAS DE PLANETAS, ASTEROIDES E COMETAS.\n\nAPLICAÇÃO DA UNIDADE ASTRONÔMICA\n\nDE UA PARA QUILÔMETROS: DISTÂNCIA (KM) = UA X 149.597.870.\n\nDE QUILÔMETROS PARA UA: UA = DISTÂNCIA (KM) / 149.597.870.\n\nEXEMPLO: MARTE NÃO ESTÁ A 227 MILHÕES DE KM DO SOL, ESTÁ A APENAS 1,52 UA.\n\nO QUE É UM ANO-LUZ?\n\nÉ A DISTÂNCIA QUE A LUZ PERCORRE EM UM ANO NO VÁCUO.\n\nA LUZ VIAJA A 300.000 KM POR SEGUNDO.\n\n1 ANO-LUZ = CERCA DE 9,46 TRILHÕES DE QUILÔMETROS.\n\nUSADO PARA MEDIR DISTÂNCIAS ALÉM DO SISTEMA SOLAR, ENTRE ESTRELAS E GALÁXIAS.\n\nAPLICAÇÃO DE ANO-LUZ\n\nDISTÂNCIA = VELOCIDADE X TEMPO.\n\n1 ANO-LUZ = 300.000 KM/S X (365 X 24 X 3600).\n\nEXEMPLO: A ESTRELA PROXIMA CENTAURI, A MAIS PRÓXIMA DO SOL, ESTÁ A 4,24 ANOS-LUZ DA TERRA, ISSO SIGNIFICA QUE A LUZ QUE VEMOS DELA HOJE SAIU DE LÁ HÁ MAIS DE 4 ANOS.';

        // Instancia o componente Slide com todas as configurações de layout e comportamento
        this.slide = new Slide(
            this,             // cena atual (contexto Phaser)
            width * 0.031,    // x — posição horizontal do slide
            height * 0.083,   // y — posição vertical do slide
            width * 0.922,    // largura do slide
            height * 0.833,   // altura do slide
            32,               // curva — arredondamento das bordas do slide
            textoSlide,       // texto — conteúdo completo exibido nos slides
            'ANOS-LUZ',       // titulo — título exibido no cabeçalho
            width * 0.10,     // xTexto — posição horizontal do texto
            height * 0.25,    // yTexto — posição vertical do texto
            width * 0.65,     // yLimite — limite vertical da área de texto
            width * 0.5,      // xTitulo — posição horizontal do título
            height * 0.18,    // yTitulo — posição vertical do título
            width * 0.75,     // xPlay — posição horizontal do botão play
            height * 0.81,    // yPlay — posição vertical do botão play
            width * 0.18,     // xBotao — posição horizontal do botão de navegação
            height * 0.795,   // yBotao — posição vertical do botão de navegação
            () => {           // novaCena — callback executado ao finalizar o último slide
                this.audioAtual = null; // limpa o áudio registrado
                this.sound.stopAll();   // para todos os sons
                this.scene.start("SistemaSolarModal"); // navega para a próxima cena
            },
            width * 0.8       // wrapTitulo — largura máxima para quebra de linha do título
        );

        // Instancia o modal de instrução centralizado na tela
        this.modal = new Modal(this, width * 0.5, height * 0.5, width / 2, height / 2);

        // Carrega as instruções da lousa e inicializa o índice no primeiro item
        this.instrucaoLousa = instrucaoLousa;
        this.indicePergunta = 0;

        // Exibe a instrução inicial (modal introdutório)
        this.mostrarInstrucao();

        // Listener para o evento de atualização de fonte (acessibilidade).
        // Disparado quando o usuário altera o tamanho da fonte nas configurações.
        this.events.on('atualizarFonte', () => {
            // Se o modal estiver visível, recria-o com a nova fonte
            if (this.modal && this.modal.container && this.modal.container.visible) {
                this.mostrarInstrucao();
            }
            // Atualiza o tamanho do texto no slide também
            if (this.slide) {
                this.slide.atualizarTamanho();
            }
        });

        // Listener para o evento 'wake': disparado quando a cena acorda após o Pause
        this.events.on('wake', () => {
            // Só retoma os sons se o usuário não tiver desativado o áudio nas configurações
            if (config.somAtivo) {
                this.sound.resumeAll(); // retoma todos os sons que estavam pausados
                // Verifica se existe um áudio registrado e se ele parou de tocar
                const som = this.sound.get(this.audioAtual);
                // Se o som existia mas foi interrompido inesperadamente, reinicia-o
                if (this.audioAtual && (!som || !som.isPlaying)) {
                    this.sound.play(this.audioAtual, { volume: 0.5 });
                }
            }
        });
    }

    // Exibe o modal de instrução inicial da cena.
    // Aplica o tamanho de fonte configurado pelo usuário e define
    // a ação do botão de confirmação do modal.
    mostrarInstrucao() {
        // Obtém o objeto de instrução correspondente ao índice atual
        const atual = this.instrucaoLousa[this.indicePergunta];

        // Lê o fator de escala de fonte definido nas configurações (padrão: 1)
        const escala = config.fonteEscolhida || 1;

        // Aplica a escala ao tamanho do título (base: 90px)
        atual.estiloTitulo.fontSize = `${Math.round(90 * escala)}px`;

        // Aplica a escala à largura máxima de quebra de linha do título (base: 1100px)
        atual.estiloTitulo.wordWrap = { width: Math.round(1100 * escala) };

        // Define o que acontece ao confirmar/fechar o modal
        atual.acao = () => {
            this.modal.hide();           // fecha o modal
            this.slide.visivel(true);    // torna os slides visíveis
            this.audioAtual = 'audioUa'; // registra o áudio ativo para controle de pause/wake
            // toca a narração apenas se o som estiver habilitado nas configurações
            if (config.somAtivo) this.sound.play('audioUa', { volume: 0.5 });
        };

        // Passa os dados de instrução para o modal e o exibe
        this.modal.setPergunta(atual);
        this.modal.show();
    }
}