// verifica se todas as perguntas já foram respondidas
export function iniciarCicloPerguntas(scene) {
    // verifica se o índice atual ultrapassou ou chegou ao total de perguntas
    if (scene.indicePergunta >= scene.perguntas.length) {

        // mansagem indicando que o jogador finalizou todas as questões
        console.log("Todas as perguntas respondidas!");
        // 2 segundos antes de avançar para a próxima fase
        scene.time.delayedCall(2000, () => {
            scene.scene.start("ProximaFase");
        });
    }
}