// define o estilo e posicionamento padrão
const stylePadrao = {
    yTitulo: -230, // Posição vertical do título

    // Posição vertical onde as alternativas começam a ser renderizadas
    yAlternativas: -80,

    // Posição vertical do botão
    yBotao: 200,

    // style do titulo
    estiloTitulo: {
        fontSize: '80px',
        color: '#1a1a1a',
    },

    // style da descrição
    estiloDescricao: {
        fontSize: '45px',
        color: '#151515',
        fontWeight: '700',
        lineSpacing: 15 // espaçamento entre as linhas do parágrafo
    }
};

// array que contém todas as perguntas
const perguntas = [
    {
        // aplica o style padrão
        ...stylePadrao,
        titulo: "SELECIONE O MELHOR LUGAR PARA CONSTRUIR UMA BASE",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "PLANÍCES DO NORTE",
            "BACIAS DE IMPACTO",
            "TERRAS ATLAS DO SUL",
            "REGIÕES EMPOEIRADAS",
            "ZONAS POLARES"
        ],
        correta: [0, 1], // indice da opção correta
        instrucoes: [0, 1, 0, 1, 2],
        perguntaMarte: true,
    },
    
];

export default perguntas;