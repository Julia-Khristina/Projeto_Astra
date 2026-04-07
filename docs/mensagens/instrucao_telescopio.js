const instrucaoTelescopio = [
    {
        // painel de informações do primeiro astro
        titulo: "BURACO NEGRO",
        descricao: 'BURACOS NEGROS SÃO REGIÕES DO ESPAÇO COM GRAVIDADE TÃO INTENSA QUE NADA CONSEGUE ESCAPAR, NEM MESMO A LUZ.',
        yTitulo: -60,
        yBotao: 58,
        escalaBotao: 0.5,
        textoBotao: 'VOLTAR!',
        estiloTitulo:    { fontSize: '30px', wordWrap: { width: 2000 } },
        estiloDescricao: { fontSize: '18px', wordWrap: { width: 430  } }
    },
    {
        // painel de informações do segundo astro
        titulo: "GALÁXIA DE ANDRÔMEDA",
        descricao: 'A GALÁXIA DE ANDRÔMEDA É A GALÁXIA ESPIRAL MAIS PRÓXIMA DA VIA LÁCTEA.',
        yTitulo: -60,
        yBotao: 52,
        escalaBotao: 0.5,
        textoBotao: 'VOLTAR!',
        estiloTitulo:    { fontSize: '34px', wordWrap: { width: 2000 } },
        estiloDescricao: { fontSize: '21px', wordWrap: { width: 430  } }
    },
    {
        // painel de informações do terceiro astro
        titulo: "NEBULOSA DE ÓRION",
        descricao: 'A NEBULOSA DE ÓRION É UMA ENORME NUVEM DE GÁS E POEIRA LOCALIZADA NA CONSTELAÇÃO DE ÓRION.',
        yTitulo: -60,
        yBotao: 58,
        escalaBotao: 0.5,
        textoBotao: 'VOLTAR!',
        estiloTitulo:    { fontSize: '34px', wordWrap: { width: 2000 } },
        estiloDescricao: { fontSize: '21px', wordWrap: { width: 430  } }
    },
    {
        // modal de conclusão exibido após explorar todos os astros
        titulo: "PARABÉNS",
        descricao: "VOCÊ CONHECEU ALGUNS ASTROS DO UNIVERSO!",
        yTitulo: -180,
        yBotao: 100,
        yDescricao: -45,
        estiloTitulo: {
            fontSize: '90px',
            wordWrap: { width: 1100 }
        },
        estiloDescricao: {
            color: '#000000',
            fontSize: '70px',
            lineSpacing: 10
        }
    }
];

export default instrucaoTelescopio;