// define o estilo e posicionamento padrão
const stylePadrao = {
    yTitulo: -120, // Posição vertical do título
    yDescricao: -20, // Posição vertical da descrição

    // Posição vertical onde as alternativas começam a ser renderizadas
    yAlternativas: -10,

    // Posição vertical do botão
    yBotao: 120,

    // style do titulo
    estiloTitulo: {
        fontSize: '80px',
        color: '#1a1a1a'
    },

    // style da descrição
    estiloDescricao: {
        fontSize: '40px',
        color: '#151515',
        fontWeight: '700',
        lineSpacing: 15 // espaçamento entre as linhas do parágrafo
    }
};

// array que contém todas as explicações
const explicacao = [
    {
        // aplica o style padrão
        ...stylePadrao,
        titulo: "MOLÉCULA DE CO2",
        descricao: "MUITO PRESENTE EM SOLO MARCIANO, PODENDO SER TRANSFORMADO EM OXIGÊNIO",
        textoBotao: 'VOLTAR!',
    },
    {
        ...stylePadrao,
        titulo: "POEIRA",
        descricao: "POEIRA FINA QUE COBRE MARTE, TAMBÉM CHAMADA DE REGOLITO. RICA EM ÓXIDOS DE FERRO E ÚTIL NA CONSTRUÇÃO DA BASE HUMANA APÓS SEU PROCESSAMENTO.",
        textoBotao: 'VOLTAR!',
    },
    {
        ...stylePadrao,
        titulo: "ROCHA",
        descricao: "CONTÊM SILÍCIO, FERRO E MAGNÉSIO. PODEM SER PROCESSADAS PARA EXTRAIR METAIS ÚTEIS NA CONSTRUÇÃO DE FERRAMENTAS E BASES HUMANAS.",
        textoBotao: 'VOLTAR!',
    },
    {
        ...stylePadrao,
        titulo: "GELO",
        descricao: "PODE SER DERRETIDO PARA PRODUZIR ÁGUA PARA ASTRONAUTAS.",
        textoBotao: 'VOLTAR!',
    },
    {
        ...stylePadrao,
        titulo: "ENERGIA IN SITU",
        descricao: "MARTE TEM SOL, VENTO E VARIAÇÃO DE TEMPERATURA. PAINÉIS SOLARES E GERADORES TERMOELÉTRICOS CONVERTEM ESSAS FONTES EM ELETRICIDADE.",
        textoBotao: 'VOLTAR!',
    },
    {
        ...stylePadrao,
        titulo: "CINZA VULCÂNICA",
        descricao: "RESTO DE VULCÕES ANTIGOS! MISTURADA COM ÁGUA, VIRA UM CIMENTO NATURAL PERFEITO PARA CONSTRUIR AS PAREDES DA BASE.",
        textoBotao: 'VOLTAR!',
    },
];

export default explicacao;