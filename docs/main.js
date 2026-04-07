import BemVindo from './scenes/BemVindo.js';
import Sistema_Solar from './scenes/sistema_solar.js';
import PrimeiroTutorial from './scenes/PrimeiroTutorial.js';
import Tutorial from './scenes/tutorial.js';
import Chegada_terra from './scenes/chegada_terra.js';
import Descida_Terra from './scenes/descida_terra.js';
import Aterrissagem_terra from './scenes/aterrissagem_terra.js';
import Lousa from './scenes/lousa.js';
import Cena_zoom from './scenes/cena_telescopio.js';
import Cena_linha_tempo from './scenes/cena_linha_tempo.js';
import GuiaAstronauta from './scenes/GuiaAstronauta.js';
import Telescopio from './scenes/telescopio.js';
import AnosLuz from './scenes/Anos-luz.js';
import Cena_Perguntas_Ua from './scenes/cenas_perguntas_ua.js';
import Terra_Marte from './scenes/Terra_Marte.js';
import SistemaSolarModal from './scenes/sistema_solar_modal.js';
import loop_marte from './scenes/Loop_marte.js';
import ImersaoMarte from './scenes/ImersaoMarte.js';
import Pause from './scenes/cena_pause.js';
import CriacaoBase from './scenes/CriacaoBase.js';
import fimMarte from './scenes/fimMarte.js';
import InicioExploracaoRecursos from './scenes/InicioExploracaoRecursos.js';
import RegioesMarte from './scenes/Regioes_Marte.js';
import pergunta_Marte from './scenes/pergunta_Marte.js';
import fimTerra from './scenes/fimTerra.js';
import cenaParabenizacao from './scenes/cenaParabenizacao.js';
import Marte_BuracoNegro from './scenes/Marte-BuracoNegro.js';


const config = {
    type: Phaser.AUTO, 

    // escala para responsividade
    scale: {
        mode: Phaser.Scale.ENVELOP, // ajusta o jogo para caber na tela
        autoCenter: Phaser.Scale.CENTER_BOTH, // centraliza vertical e horizontalmente
        width: 1280, 
        height: 720, 
        fullscreenTarget: document.documentElement,
    },

    resolution: window.devicePixelRatio || 1, 
    pixelArt: false, // Garante que não tente "pixelar" as bordas
    antialias: true,
    autoRound: true,
    backgroundColor: 'rgb(10,13,48)',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },

    scene: [BemVindo, Telescopio, pergunta_Marte, AnosLuz, Cena_Perguntas_Ua, Chegada_terra, Descida_Terra, fimTerra, Sistema_Solar, PrimeiroTutorial, Tutorial, Aterrissagem_terra, Lousa, Terra_Marte, Cena_linha_tempo, Cena_zoom, GuiaAstronauta, SistemaSolarModal, Marte_BuracoNegro, InicioExploracaoRecursos, loop_marte, fimMarte, Pause, ImersaoMarte, CriacaoBase, RegioesMarte, cenaParabenizacao]

};

document.fonts.ready.then(() => {
    new Phaser.Game(config);
});