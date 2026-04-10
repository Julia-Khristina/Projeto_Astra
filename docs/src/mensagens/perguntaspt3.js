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
        fontSize: '32px',
        color: '#151515',
        fontWeight: '700',
        lineSpacing: 15 // espaçamento entre as linhas do parágrafo
    }
};

// array que contém todas as perguntas
const perguntaspt3 = [
    {
        // aplica o style padrão
        ...stylePadrao,
        titulo: "VAMOS PRATICAR!",
        descricao: "POR QUE AS PLANÍCIES DO NORTE SÃO CONSIDERADAS O MELHOR LUGAR PARA CONSTRUIR UMA BASE HUMANA EM MARTE?",
        // lista com as alternativas exibidas nas cards
        alternativas: [
            "GRANDES RESERVAS DE GELO E TEMPERATURA MAIS AMENA.",
            "RICAS EM CINZAS VULCÂNICAS PRONTAS PARA USO NA CONSTRUÇÃO.",
            "PROTEGIDAS DA RADIAÇÃO SOLAR PELAS MONTANHAS.",
            "REGIÕES PLANAS E JOVENS, COM POUCAS CRATERAS."
        ],
        correta: [3] // índice da opção correta (letra D)
    },
    {
        ...stylePadrao,
        titulo: "VAMOS PRATICAR!",
        descricao: "O QUE É UMA UNIDADE ASTRONÔMICA (UA) E POR QUE ELA É USADA PELOS CIENTISTAS?",
        alternativas: [
            "A VELOCIDADE MÁXIMA QUE UMA NAVE ATINGE NO ESPAÇO.",
            "A DISTÂNCIA ENTRE A TERRA E A LUA.",
            "A DISTÂNCIA MÉDIA ENTRE A TERRA E O SOL.",
            "O TAMANHO MÉDIO DE UMA ESTRELA."
        ],
        correta: [2] // índice da opção correta (letra C)
    },
    {
        ...stylePadrao,
        // Mantive a fonte um pouco menor aqui para garantir que a pergunta mais longa caiba na tela
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "POR QUE O TELESCÓPIO HUBBLE CONSEGUE CAPTURAR IMAGENS MUITO MAIS NÍTIDAS DO QUE OS TELESCÓPIOS INSTALADOS NA SUPERFÍCIE DA TERRA?",
        alternativas: [
            "USA LENTES MAIORES DO QUE QUALQUER TELESCÓPIO TERRESTRE.",
            "ESTÁ FORA DA ATMOSFERA, SEM INTERFERÊNCIA DO AR.",
            "ÓRBITA MAIS PERTO DAS ESTRELAS OBSERVADAS.",
            "FUNCIONA SÓ COM LUZ INFRAVERMELHA."
        ],
        correta: [1] // índice da opção correta (letra B)
    },
    {
        ...stylePadrao,
        // Mantive a fonte um pouco menor aqui para garantir que a pergunta mais longa caiba na tela
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "SOLO AVERMELHADO RICO EM ÓXIDO DE FERRO: QUAL O PRINCIPAL DESAFIO PARA A BASE?",
        alternativas: [
            "FACILITA A PRODUÇÃO DE ENERGIA SOLAR SEM QUALQUER INTERFERÊNCIA.",
            "AUMENTA A DISPONIBILIDADE DE OXIGÊNIO NA ATMOSFERA.",
            "PODE PREJUDICAR EQUIPAMENTOS E REDUZIR A EFICIÊNCIA DE PAINÉIS SOLARES.",
            "IMPOSSIBILITA COMPLETAMENTE A CONSTRUÇÃO DE ESTRUTURAS."
            ],
    correta: [2] // índice da opção correta (letra C)
    },
    {
        ...stylePadrao,
        // Mantive a fonte um pouco menor aqui para garantir que a pergunta mais longa caiba na tela
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "AO UTILIZAR RECURSOS LOCAIS EM MARTE, QUAL ESTRATÉGIA TORNA A MISSÃO MAIS VIÁVEL A LONGO PRAZO?",
        alternativas: [
            "TRANSPORTAR TODOS OS RECURSOS NECESSÁRIOS DA TERRA.",
            "UTILIZAR APENAS ENERGIA GERADA NA TERRA.",
            "APROVEITAR MATERIAIS DISPONÍVEIS NO PLANETA PARA PRODUZIR O NECESSÁRIO.",
            "EVITAR O USO DE QUALQUER RECURSO MARCIANO."
        ],
        correta: [2] // índice da opção correta (letra C)
    },
    {
        ...stylePadrao,
        // Mantive a fonte um pouco menor aqui para garantir que a pergunta mais longa caiba na tela
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "NA DINÂMICA DE COMBINAÇÃO DE RECURSOS, POR QUE O USO DE PAINÉIS SOLARES É ESSENCIAL PARA A SOBREVIVÊNCIA DA BASE?",
        alternativas: [
            "PORQUE FORNECE ENERGIA PARA PRODUZIR OXIGÊNIO E OPERAR EQUIPAMENTOS.",
            "PORQUE A ENERGIA SOLAR AUMENTA A GRAVIDADE DE MARTE.",
            "PORQUE OS PAINÉIS SOLARES PRODUZEM ÁGUA DIRETAMENTE.",
            "PORQUE SUBSTITUEM COMPLETAMENTE TODOS OS OUTROS RECURSOS."
        ],
        correta: [0]  // índice da opção correta (letra A)
    },
    {
        ...stylePadrao,
        // Mantive a fonte um pouco menor aqui para garantir que a pergunta mais longa caiba na tela
        estiloDescricao: { 
            fontSize: '32px',              
            lineSpacing: 15                
        },
        titulo: "VAMOS PRATICAR!",
        descricao: "UM GRUPO DECIDE INSTALAR UMA BASE EM UMA REGIÃO COM MUITAS CRATERAS E TERRENO IRREGULAR. QUAL É O PRINCIPAL RISCO DESSA ESCOLHA PARA A CONSTRUÇÃO?",
        alternativas: [
            "MAIOR DIFICULDADE DE POUSO E INSTALAÇÃO DE ESTRUTURAS DEVIDO AO TERRENO ACIDENTADO.",
            "AUSÊNCIA TOTAL DE RECURSOS NATURAIS NA REGIÃO.",
            "EXCESSO DE OXIGÊNIO NA ATMOSFERA LOCAL.",
            "TEMPERATURAS MAIS ALTAS DO QUE NO RESTANTE DO PLANETA."
        ],
        correta: [0] // índice da opção correta (letra A)
    }

];

export default perguntaspt3;