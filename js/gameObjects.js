function initGameObject() {
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
    const scoreScreen = document.querySelector('.score');

    return {
        startScreen,
        gameScreen,
        scoreScreen,
        createCat(initialState) {
            let catElement = document.createElement('div');
            catElement.classList.add('cat');

            catElement.style.width = initialState.width + 'px';
            catElement.style.height = initialState.height + 'px';

            catElement.style.left = initialState.posX + 'px';
            catElement.style.top = initialState.posY + 'px';

            this.catElement = catElement;

            gameScreen.appendChild(catElement);

            return catElement;
        },
        createFish(cat, fish) {
            let fishElement = document.createElement('div');
            fishElement.classList.add('fish');
            fishElement.style.left = cat.posX + cat.width + 'px';
            fishElement.style.top = cat.posY + cat.height / 2 + 30 +'px';
            fishElement.style.width = fish.width + 'px';
            fishElement.style.height = fish.height + 'px';

            gameScreen.appendChild(fishElement);
        },
        createBall(stats) {
            const ballElement = document.createElement('div');
            ballElement.classList.add('ball');
            ballElement.style.width = stats.width + 'px';
            ballElement.style.height = stats.height + 'px';
            ballElement.style.left = gameScreen.offsetWidth - stats.width + 'px';
            ballElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px';

            gameScreen.appendChild(ballElement);
        }
    };
}