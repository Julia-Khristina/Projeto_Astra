const instrucaoTutorial = [
    {
        titulo: "CUIDADO!",
        descricao: "DESVIE DOS METEOROS PARA CHEGARMOS À TERRA!",
        textoBotao: "ENTENDI!",
        alternativas: [], // Define como vazio para o modal entender que é um alerta

        // Posicionamento vertical (Ajustado para o seu Modal)
        yTitulo: -110, 
        yBotao: 120,    // Aumentado um pouco para dar respiro à descrição
        yDescricao: -10, 

        // Estilo do título
        estiloTitulo: {
            fontSize: '90px',
            color: '#1a1a1a',
            fontWeight: 'bold',
            wordWrap: { width: 1100 } 
        },

        // Estilo da descrição
        estiloDescricao: {
            color: '#000000',
            fontSize: '38px',
            lineSpacing: 10,
            fontWeight: '700',
            wordWrap: { width: 750 }
        }
    }
];

export default instrucaoTutorial;