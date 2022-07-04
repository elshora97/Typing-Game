const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('setting-btn');
const settings = document.getElementById('setting');
const settingsForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [ 'sigh', 'tense', 'airplane', 'ball', 'pies', 'juice', 'warlike', 'bad', 'north', 'dependent', 'steer', 'silver', 'highfalutin', 'superficial', 'quince', 'eight', 'feeble', 'admit', 'drag', 'loving' ];

let randomWord;

let score = 0;
let time = 10;

text.focus();

const timeInterval = setInterval(updateTime,1000);

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

function getRandomWord(){
    return words[Math.floor(Math.random()* words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;  
}

//update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval)

        //end game
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `

    endgameEl.style.display = 'flex';
}


addWordToDOM();


//event listeners 
text.addEventListener('input', e => {
    const insertedWord = e.target.value;

    if(insertedWord === randomWord){
        addWordToDOM();
        updateScore();

        e.target.value = ''
        
        if(difficulty == 'hard'){
            time += 2;
            updateTime();
        }else if(difficulty == 'medium'){
            time += 3;
            updateTime();
        }else {
            time += 5;
            updateTime();
        }
    

        
    };
})

// settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsBtn.addEventListener('click', () => 
settings.classList.toggle('hide'));

settingsForm.addEventListener('change' , e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
})

