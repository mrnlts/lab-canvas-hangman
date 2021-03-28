class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    let minIndex = 0;
    let maxIndex = this.words.length;
    let gameWord = this.words[Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex];
    return gameWord; 
  }

  checkIfLetter(key) {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet.includes(key);
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
  }

  checkGameOver() {
    return this.errorsLeft === 0;
  }

  checkWinner() {
    let result = '';
    for (let i=0; i < this.secretWord.length; i++)  {
      if (this.guessedLetters.indexOf(this.secretWord[i]) === -1) {
        result += "f";
      } else {
        result += "t";
      }
    }
    if (result.includes("f")){
      return false;
    } else if (!result.includes("f") && result.length === this.secretWord.length) {
      return true;
    }
  }
}

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

startGameButton.addEventListener('click', event => {
  console.log("let's go!");
  hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
  hangman.secretWord = hangman.pickWord();
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
  // document.getElementById("splashScreen-img").innerHTML = '';
  // document.getElementById("splashScreen-btn").innerHTML = '';
});

document.addEventListener('keydown', event => {
  if (!hangman.checkWinner() && !hangman.checkGameOver()) {
    const isLetter = hangman.checkIfLetter(event.key);

    if (isLetter) {
      const isNotClicked = hangman.checkClickedLetters(event.key.toLowerCase());

      if (isNotClicked) {
        const correctLetterIndex = hangman.secretWord.indexOf(event.key);

        if (correctLetterIndex > -1) {
          hangman.addCorrectLetter(event.key);
          hangmanCanvas.writeCorrectLetter(correctLetterIndex);

          const isWinner = hangman.checkWinner();

          if (isWinner) {
            hangmanCanvas.winner();
          }
        } else {
          hangman.addWrongLetter(event.key);

          hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
          hangmanCanvas.drawHangman(hangman.errorsLeft);

          const isGameOver = hangman.checkGameOver();

          if (isGameOver) {
            hangmanCanvas.gameOver();
          }
        }
      }
    } else {
      hangmanCanvas.writeInvalidKeyMessage();
    }
  }
});
