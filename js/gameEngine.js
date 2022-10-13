function start(state, game) {
    game.createCat(state.cat);

    window.requestAnimationFrame(gameLoop.bind(null, state, game))
}

function gameLoop(state, game, timestamp) {
    const { cat } = state;
    const { catElement } = game;
   
    
    game.scoreScreen.textContent = `name: ${state.player.toLocaleUpperCase()}  score: ${state.score} pts.`;
    
    modifyCatPosition(state, game);

    if (state.keys.Space) {
        game.catElement.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2012/04/12/21/36/cats-30746_960_720.png")';
        game.catElement.style.width = '13.75rem';
        game.catElement.style.height = '12.5rem';
        if (timestamp > state.fish.nextSpawnTimestamp) {
            game.createFish(cat, state.fish);
            state.fish.nextSpawnTimestamp = timestamp + state.fish.fireRate;
        }
    } else {
        game.catElement.style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2012/04/12/21/36/cats-30746_960_720.png")';
        game.catElement.style.width = '13.75rem';
        game.catElement.style.height = '12.5rem';
    }
    

    // Spawn balls
    if (timestamp > state.ballStats.nextSpawnTimestamp) {
        game.createBall(state.ballStats);
        state.ballStats.nextSpawnTimestamp = timestamp + Math.random() * state.ballStats.maxSpawnInterval;
    }

    // Render balls
    let ballElements = document.querySelectorAll('.ball');
    ballElements.forEach(ball => {
        let posX = parseInt(ball.style.left);

        // Detect collsion with cat
        if (detectCollision(catElement, ball)) {
            state.gameOver = true;
        }

        if (posX > 0) {
            ball.style.left = posX - state.ballStats.speed + 'px';
        } else {
            ball.remove();
        }
    });

    // Render fishs
    document.querySelectorAll('.fish').forEach(fish => {
        let posX = parseInt(fish.style.left);

        // Detect collision
        ballElements.forEach(ball => {
            if (detectCollision(ball, fish)) {
                state.score += state.killScore;
                ball.remove();
                fish.remove();
            }
        });

        if (posX > game.gameScreen.offsetWidth) {
            fish.remove();
        } else {
            fish.style.left = posX + state.fish.speed + 'px';
        }
    });

    // Render cat
    catElement.style.left = cat.posX + 'px';
    catElement.style.top = cat.posY + 'px';

    
    if (state.gameOver) {
        alert(`Game Over - ${state.player} You had ${state.score} pts.`);
         window.location.reload(); 
    } else {
        state.score += state.scoreRate;
        window.requestAnimationFrame(gameLoop.bind(null, state, game));
       
    }
}

function modifyCatPosition(state, game) {
    const { cat } = state;

    if (state.keys.ArrowLeft) {
        cat.posX = Math.max(cat.posX - cat.speed, 0);
    }

    if (state.keys.ArrowDown) {
        cat.posY = Math.min(cat.posY + cat.speed, game.gameScreen.offsetHeight - cat.height -100);
    }

    if (state.keys.ArrowRight) {
        cat.posX = Math.min(cat.posX + cat.speed, game.gameScreen.offsetWidth - cat.width);
    }

    if (state.keys.ArrowUp) {
        cat.posY = Math.max(cat.posY - cat.speed, 0);
    }
}

function detectCollision(objectA, objectB) {
    let first = objectA.getBoundingClientRect();
    let second = objectB.getBoundingClientRect();

    let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right)

    return hasCollision;
}