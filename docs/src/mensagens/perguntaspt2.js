// define o estilo e posicionamento padrão
const stylePadrao = {
    yTitulo: -230, // Posição vertical do título
    yDescricao: -140, // Posição vertical da descrição

    // Posição vertical onde as alternativas começam a ser renderizadas
    yAlternativas: -10,

    // Posição vertical do botão
    yBotao: 200,

    // style do titulo
    estiloTitulo: {
        fontSize: '80px',
        color: '#1a1a1a'
    },

    // style da descrição
    estiloDescricao: {
        fontSize: '45px',
        color: '#151515',
        fontWeight: '700',
        lineSpacing: 15 // espaçamento entre as linhas do parágrafo
    },
};

// array que contém todas as perguntas
const perguntas2 = [
    {
        // aplica o style padrão
        ...stylePadrao,
        titulo: "VAMOS PRATICAR!",
        descricao: "A UNIDADE ASTRONÔMICA (UA) CORRESPONDE A",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "DISTÂNCIA ENTRE A TERRA E A LUA",
            "A DISTÂNCIA MÉDIA ENTRE A TERRA E O SOL",
            "A DISTÂNCIA QUE A LUZ PERCORRE EM UM DIA",
            "A DISTÂNCIA ENTRE MARTE E JÚPITER"
        ],
        correta: [1] // indice da opção correta
    },
    {
        ...stylePadrao,
        titulo: "VAMOS PRATICAR!",
        descricao: "SABENDO QUE 1 UA ≈ 149.597.870 KM, A DISTÂNCIA DE 2 UA CORRESPONDE A:",
        alternativas: [
            "74.798.935 KM .",
            "149.597.870 KM. ",
            "299.195.740 KM. ",
            "1.495.978.700 KM."
        ],
        correta: [2]
    },
    {
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "UM ANO-LUZ É:",
        alternativas: [
            "UMA MEDIDA DE TEMPO USADA NA ASTRONOMIA.",
            "A DISTÂNCIA QUE A LUZ PERCORRE EM UM MÊS",
            "A DISTÂNCIA QUE A LUZ PERCORRE EM UM ANO.",
            "A DISTÂNCIA DA TERRA AO SOL."
        ],
        correta: [2]
    },
    {
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "SABENDO QUE 1 ANO-LUZ ≈ 9,46 × 10¹² KM, A ESTRELA PROXIMA CENTAURI ESTÁ A 4,24 ANOS-LUZ DA TERRA. ISSO SIGNIFICA QUE",
        alternativas: [
            "A LUZ LEVA 4,24 DIAS PARA CHEGAR ATÉ NÓS.",
            "A LUZ LEVA 4,24 MESES PARA CHEGAR ATÉ NÓS. ",
            "A LUZ LEVA 4,24 ANOS PARA CHEGAR ATÉ NÓS.",
            "A LUZ LEVA 4,24 HORAS PARA CHEGAR ATÉ NÓS."
        ],
        correta: [2]
    },
    {
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        fontSizeAlternativas: '32px',
        titulo: "VAMOS PRATICAR!",
        descricao: "CONVERTA 300.000.000 KM PARA METROS",
        alternativas: [
            "3 × 10⁶ M",
            "3 × 10⁸ M",
            "3 × 10¹⁰ M",
            "3 × 10¹¹ M"
        ],
        correta: [3]
    }
];

export default perguntas2;