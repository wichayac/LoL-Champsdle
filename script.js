const wordList = ["akali", "akshan", "amumu", "anivia", "annie", "brand", "braum", "corki", "diana", "elise", "fiora", "galio", "garen", "ivern", "janna", 
"jayce", "kaisa", "karma", "kayle", "leona", "milio", "nasus", "neeko", "nilah", "poppy", "quinn", "rakan", "riven", "senna", "shaco", "sivir", "swain", "sylas",
"talon", "taric", "teemo", "urgot", "varus", "vayne", "viego", "xayah", "yasuo", "yuumi", "ziggs"];
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
let attempts = 6;
let currentAttempt = 0;

const board = document.getElementById("board");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");

function createRow() {
    const row = document.createElement("div");
    row.className = "row";
    for (let i = 0; i < 5; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        row.appendChild(cell);
    }
    board.appendChild(row);
}

function giveFeedback(guess, secretWord) {
    const feedback = [];
    const secretWordList = secretWord.split('');

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secretWord[i]) {
            feedback[i] = "green";
            secretWordList[i] = null; //used letter
        } else {
            feedback[i] = null;
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (feedback[i] === null) {
            if (secretWordList.includes(guess[i])) {
                feedback[i] = "yellow";
                secretWordList[secretWordList.indexOf(guess[i])] = null; //used letter
            } else {
                feedback[i] = "gray";
            }
        }
    }

    return feedback;
}

function displayFeedback(guess, feedback) {
    const cells = board.children[currentAttempt].children;
    for (let i = 0; i < guess.length; i++) {
        cells[i].innerText = guess[i];
        cells[i].classList.add(feedback[i]);
    }
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 5 || !wordList.includes(guess)) {
        alert("Please enter a valid 5-letter word.");
        return;
    }

    const feedback = giveFeedback(guess, secretWord);
    displayFeedback(guess, feedback);
    currentAttempt++;

    if (guess === secretWord) {
        message.innerText = "You've guessed it!";
        guessButton.disabled = true;
    } else if (currentAttempt === attempts) {
        message.innerText = `Almost there! The correct word was '${secretWord}'.`;
        guessButton.disabled = true;
    }

    guessInput.value = "";
    guessInput.focus();
}

// Initialize the game
for (let i = 0; i < attempts; i++) {
    createRow();
}

guessButton.addEventListener("click", checkGuess);
guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkGuess();
    }
});
