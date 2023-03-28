function initState() {
    let name = document.querySelector('input').value;
    
    const state = {
        player: `${name}`,
        gameOver: false,
        score: 0,
        scoreRate: 1,
        killScore: 1000,
        cat: {
            width: 190,
            height: 100,
            posX: 20,
            posY: 500,
            speed: 10,
        },
        ballStats: {
            width: 126,
            height: 119,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 4000,
            speed: 3,
        },
        fish: {
            width: 70,
            height: 30,
            speed: 12,
            nextSpawnTimestamp: 0,
            fireRate: 500,
        },
        keys: {
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
            Space: false,
        }
    }

    return state;
}