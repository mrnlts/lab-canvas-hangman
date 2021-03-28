class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.context.height = '800px';
    this.context.width = '1200px';
    this.secretWord = secretWord;
    this.hangmanParts = ['head', 'body', 'rightArm', 'rightHand', 'leftArm', 'leftHand', 'rightLeg', 'rightFoot', 'leftLeg', 'leftFoot'];
    this.context.strokeStyle = 'black';
    this.context.textAlign = 'center';
    this.context.font = '48px Georgia';
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines(150, 600, 225, 650);
    this.drawLines(225, 650, 75, 650);
    this.drawLines(75, 650, 150, 600);
    this.drawLines(150, 600, 150, 200);
    this.drawLines(150, 200, 400, 200);
    this.drawLines(400, 200, 400, 300);

    for (let i=0; i<this.secretWord.length; i++) {
      this.drawLines(400 + i*70, 670, 450+i*70, 670);
    }
  }

  drawLines(x1, y1, x2, y2) {
    this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke();
    this.context.closePath();
  }

  writeCorrectLetter(index) {
    const guessedLetter = this.secretWord[index];
    for (let i = 0; i < this.secretWord.length; i ++) {
      if (this.secretWord[i] === guessedLetter) {
        this.context.fillText(guessedLetter, 425 + i * 75, 645);
      }
    }
  }

  writeWrongLetter(letter, errorsLeft) {
    let letterOrder = 10 - errorsLeft;
    this.context.fillText(letter, 450 + letterOrder * 50, 250);
  }

  drawHangman(errorsLeft) {
    let errorOrder = 10 - errorsLeft;
    let hangmanPart = this.hangmanParts[errorOrder - 1];

    switch (hangmanPart) {
      case 'head':
        this.context.beginPath();
        this.context.arc(400, 330, 30, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
        this.drawLines(385, 315, 390, 320);
        this.drawLines(390, 315, 385, 320);
        this.drawLines(415, 315, 410, 320);
        this.drawLines(410, 315, 415, 320);
        this.drawLines(390, 340, 410, 340);
        break;
      case 'body':
        this.drawLines(400, 360, 400, 480);
        break;
      case 'rightArm':
        this.drawLines(400, 390, 430, 440);
        break;
      case 'leftArm':
        this.drawLines(400, 390, 370, 440);
        break;
      case 'rightLeg':
        this.drawLines(400, 480, 430, 550);
        break;
      case 'leftLeg':
        this.drawLines(400, 480, 370, 550);
        break;
      case 'rightHand':
        this.drawLines(430, 440, 440, 435);
        break;
      case 'leftHand':
        this.drawLines(370, 440, 360, 435);
        break;
      case 'rightFoot':
        this.drawLines(430, 550, 445, 540);
        break;
      case 'leftFoot':
        this.drawLines(370, 550, 355, 540);
        break;
      default:
        console.log('Part does not exist');
    }
  }

  gameOver() {
    let gameOverImg = new Image();
    gameOverImg.src = './images/gameover.png';
    gameOverImg.onload = () => setTimeout(()=> {
      this.context.clearRect(0, 0, this.context.width, this.context.height);
      this.context.drawImage(gameOverImg, 320, 150);
    }, 1000);
  }

  winner() {
    let winImg = new Image();
    winImg.src = './images/awesome.png';
    winImg.onload = ()=> setTimeout (()=> {
      this.context.clearRect(0, 0, this.context.width, this.context.height);
      this.context.drawImage(winImg, 320, 150);
    }, 1000);
  }

  writeInvalidKeyMessage() {
    this.context.font = '38px Georgia';
    this.context.fillText('Tecla Inválida. Presione somente teclas contendo letras!', 600, 100);

    setTimeout(() => {
      this.context.clearRect(0, 0, this.context.width, 100);
    }, 1500);
  }
}