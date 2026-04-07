// mensagens exibidas nos modais da cena de linha do tempo
const instrucaoLinha = [
    {
        titulo: "ORDENE OS ACONTECIMENTOS DESDE O BIG BANG",
        yTitulo: -34,
        yBotao: 27,
        estiloTitulo: {
            fontSize: '55px',
            wordWrap: { width: 2000 }
        }
    },
    {
        titulo: "ESSA NÃO É A ORDEM CORRETA, TENTE NOVAMENTE",
        yTitulo: -34,
        yBotao: 60,
        textoBotao: 'TENTAR NOVAMENTE',
        estiloTitulo: {
            fontSize: '60px',
            wordWrap: { width: 1200 }
        }
    },
    {
        titulo: "PARABÉNS, A LINHA DO TEMPO ESTÁ CORRETA",
        yTitulo: -34,
        yBotao: 60,
        textoBotao: 'CONTINUAR',
        estiloTitulo: {
            fontSize: '60px',
            wordWrap: { width: 1200 }
        }
    }
];

export default instrucaoLinha;