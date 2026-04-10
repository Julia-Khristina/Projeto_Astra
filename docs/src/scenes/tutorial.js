import config from '../global/config.js';
import ChuvaMeteoros from './ChuvaMeteoros.js';
import Modal from '../components/modal.js';

export default class Tutorial extends ChuvaMeteoros {
    constructor() {
        super("Tutorial");
    }

    create() {
        const { width, height } = this.scale;

        super.create(); 
        this.modal = new Modal(this, width * 0.51, height * 0.55, 2, 2);

        // modal acima de todos os elementos
        if (this.modal.container) {
            this.modal.container.setDepth(100); 
        }
        
        // timer de 30 segundos para mudar de tela
        this.timerFinal = this.time.delayedCall(20000, () => {
            if (this.modal.container.visible) {
                this.tempoEsgotado = true;
            } else {
                this.irParaProximaTela();
            }
        });
    }

    irParaProximaTela() {
        console.log("Indo para a Terra.");
        this.scene.start("Chegada_terra"); 
    }

    aoColidir(nave, meteoro) {
        meteoro.destroy();
        this.pararChuva(); // geração de meteoros
        
        this.modal.setPergunta({
            titulo: "CUIDADO!",
            descricao: "DESVIE DOS METEOROS PARA CHEGARMOS À TERRA!",
            alternativas: [], // Sem alternativas, apenas instrução
            textoBotao: "ENTENDI!",
            acao: () => {
                this.modal.hide();
                if (this.timerFinal) this.timerFinal.paused = false;
                if (this.tempoEsgotado) {
                    this.irParaProximaTela();
                    return;
                }
                this.comecarChuva(); // Retoma o jogo
            }
        });

        if (this.timerFinal) this.timerFinal.paused = true;
        this.modal.show();
    }
}