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
    }
};

// array que contém todas as perguntas
const perguntas = [
    {
        // aplica o style padrão
        ...stylePadrao,
        titulo: "VAMOS PRATICAR!",
        descricao: "VOCÊ PERCORREU UMA DISTÂNCIA TOTAL DE 19 TRILHÕES DE QUILÔMETROS DESDE A TERRA. ESSA DISTÂNCIA EQUIVALE A QUANTOS ANOS-LUZ?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "1 ANO-LUZ",
            "2 ANOS-LUZ",
            "5 ANOS-LUZ",
            "6 ANOS-LUZ"
        ],
        correta: [1] // indice da opção correta
    },
    {
         // aplica o style padrão
        ...stylePadrao,
        titulo: "VAMOS PRATICAR!",
        descricao: "PARA QUE FOI LANÇADO O JAMES WEBB SPACE TELESCOPE EM 2021?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "OBSERVAR O INTERIOR DA TERRA PARA ESTUDAR TERREMOTOS.",
            "ESTUDAR PLANETAS, ESTRELAS E GALÁXIAS, INCLUSIVE OS MAIS ANTIGOS DO UNIVERSO.",
            "MONITORAR O CLIMA E AS NUVENS DA ATMOSFERA TERRESTRE.",
            "ENVIAR ASTRONAUTAS PARA EXPLORAR OUTROS PLANETAS."
        ],
        correta: [1] // indice da opção correta
    },
    {
         // aplica o style padrão
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "DE ACORDO COM A TEORIA DO BIG BANG, QUAL FOI O PRIMEIRO EVENTO DO UNIVERSO?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "A FORMAÇÃO DO PLANETA TERRA.",
            "O SURGIMENTO DOS DINOSSAUROS.",
            "A GRANDE EXPANSÃO INICIAL QUE DEU ORIGEM AO UNIVERSO.",
            "A FORMAÇÃO DO SISTEMA SOLAR."
        ],
        correta: [2] // indice da opção correta
    },
    {
         // aplica o style padrão
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "QUAL FOI O PRINCIPAL RESULTADO DO RESFRIAMENTO DO UNIVERSO APÓS O BIG BANG?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "A FORMAÇÃO DOS PLANETAS.",
            "A FORMAÇÃO DOS PRIMEIROS GASES, COMO HIDROGÊNIO E HÉLIO.",
            "O SURGIMENTO DAS GALÁXIAS ESPIRAIS.",
            "A CRIAÇÃO DOS BURACOS NEGROS."
        ],
        correta: [1] // indice da opção correta
    },
    {
         // aplica o style padrão
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "POR QUE AS PRIMEIRAS ESTRELAS FORAM IMPORTANTES PARA O UNIVERSO?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "PORQUE PRODUZIRAM LUZ APENAS.",
            "PORQUE CRIARAM ELEMENTOS COMO CARBONO E OXIGÊNIO.",
            "PORQUE FORMARAM OS PLANETAS DIRETAMENTE.",
            "PORQUE DIMINUÍRAM A TEMPERATURA DO UNIVERSO."
        ],
        correta: [1] // indice da opção correta
    },
    {
         // aplica o style padrão
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "O QUE OCORREU DURANTE A FORMAÇÃO DO SISTEMA SOLAR?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "UMA ESTRELA EXPLODIU E FORMOU OS PLANETAS.",
            "UMA NUVEM DE POEIRA COLIDIU COM A TERRA.",
            "UMA NUVEM DE POEIRA COLAPSOU, FORMANDO O SOL E OS PLANETAS.",
            "O UNIVERSO PAROU DE SE EXPANDIR."
        ],
        correta: [2] // indice da opção correta
    },
    {
         // aplica o style padrão
        ...stylePadrao,
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "QUAL FOI O PRINCIPAL PROBLEMA ENCONTRADO NO TELESCÓPIO HUBBLE LOGO APÓS SEU LANÇAMENTO?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "ELE NÃO CONSEGUIA SE MANTER EM ÓRBITA.",
            "ELE NÃO CONSEGUIA CAPTAR LUZ DAS ESTRELAS.",
            "ELE PERDEU CONTATO COM A TERRA.",
            "SUAS IMAGENS SAÍAM BORRADAS DEVIDO A UM ERRO NO ESPELHO."
        ],
        correta: [3] // indice da opção correta
    }
];

export default perguntas;