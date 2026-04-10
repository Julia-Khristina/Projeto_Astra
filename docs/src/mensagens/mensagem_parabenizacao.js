import Modal from '../components/modal.js';

export default function exibirModalParabenizacao(cena) {
    const { width, height } = cena.scale;
    const modalConfigurado = new Modal(cena, width * 0.63, height * 0.42, width * 0.50, height * 0.69);

    // Configura os textos da missão
    modalConfigurado.setPergunta({
        titulo: "MISSÃO CUMPRIDA!",
        descricao: "EXCELENTE TRABALHO, ASTRONAUTA! OS DADOS DO PROJETO ASTRA FORAM COLETADOS COM SUCESSO.",
        yTitulo: -80,
        yDescricao: 20
    });

    // Mostra o modal e esconde o botão
    modalConfigurado.show();
    modalConfigurado.botaoAcaoGeral.setVisible(false);

    // Retorna o modal
    return modalConfigurado;
}