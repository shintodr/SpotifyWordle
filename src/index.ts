import fiveLetterWords from './five_letter_words.json';

console.log(fiveLetterWords);
const wordList = fiveLetterWords;

console.log(wordList);

console.log("Wordle Clone Initialized!");
let currentGuessRow = 0;
let currentGuessColummn = 0;
let wordIndex = Math.floor(Math.random() * (wordList.length - 1));
let word = wordList[wordIndex].toUpperCase();
console.log("WORD: " + word);
let wordMap = new Map();

let grid: HTMLDivElement[][] = [];
const wordleGrid = document.getElementById("wordle-grid")

function createTargetWordMap(){
  for(let i = 0; i < word.length; i++){
    if(wordMap.has(word[i])){
      wordMap.set(word[i], wordMap.get(word[i]).concat([i]))
    } else {
      wordMap.set(word[i], [i])
    }
  }
  console.log('created wordMap:')
  console.log(wordMap)
}

createNextButton();

function createNextButton(){
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", () => {
    nextButton.blur();
    document.body.focus();
    handleNextPress();
  });
  nextButton.classList.add("next-button");
  const titleDiv = document.getElementById("title");
  if (titleDiv) {
    titleDiv.appendChild(nextButton);
  }
}

function handleNextPress(){
  console.log("NEXT BUTTON PRESSED");
  const wordleGrid = document.getElementById("wordle-grid");
  const keyboard = document.getElementById("keyboard");
  if (wordleGrid) wordleGrid.innerHTML = ""; // Clears the grid cells
  if (keyboard) keyboard.innerHTML = ""; // Clears the keyboard buttons

  wordIndex = Math.floor(Math.random() * (wordList.length - 1));
  console.log('wordIndex: ' + wordIndex);
  word = wordList[wordIndex].toUpperCase();
  console.log('wordList: ' + wordList)
  console.log("NEW WORD: " + word);
  wordMap.clear();
  createTargetWordMap();
  currentGuessRow = 0;
  currentGuessColummn = 0;
  createKeyboard();
  setFeedback("");
  createGrid();
}

createTargetWordMap();

function createGrid() {
  grid = [];
    for (let i = 0; i < 6; i++) {
      const row: HTMLDivElement[] = [];
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            wordleGrid?.appendChild(cell);
            row.push(cell);
        }
        grid.push(row);
    }
}
  
createGrid();

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const rows = ["qwertyuiop", "asdfghjkl", ">zxcvbnm<"];
  
    rows.forEach(row => {
      const rowDiv = document.createElement("div");
      row.split("").forEach(letter => {
        const button = document.createElement("button");
        let keyString = letter;
        if(letter == "<" || letter == ">"){
            if(letter == "<"){
                keyString = "<-";
            } else {
                keyString = "enter";
            }
        }
        button.textContent = keyString;
        button.id = 'key-' + letter.toLowerCase();
        console.log("BUTTON ID: " + button.id);
        button.classList.add("key");
        button.addEventListener("click", () => handleKeyPress(keyString));
        rowDiv.appendChild(button);
      });
      keyboard?.appendChild(rowDiv);
    });
  }
  
  createKeyboard();

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
  
    if (key.toUpperCase() != key.toLowerCase() && key != "enter" && key != "backspace") {
      // Handle letter input
      handleKeyPress(key);
    } else if (key === "enter") {
      // Handle the Enter key
      handleKeyPress("enter");
    } else if (key === "backspace") {
      // Handle the Backspace key
      handleKeyPress("<-");
    }
  });

  function isCharacterALetter(c: string){
    return (/[a-zA-Z]/).test(c);
  }

  function handleKeyPress(letter: string) {
    console.log("Key pressed:", letter); // Placeholder

    // there is space for a letter
    if(currentGuessRow < 6 && currentGuessColummn < 5 && letter != "enter" && letter != "<-" && isCharacterALetter(letter)){
      console.log("FILLING OUT LETTER IN CELL")
      const cell = grid[currentGuessRow][currentGuessColummn];
      cell.textContent = letter.toUpperCase(); // Set the letter in the cell
      currentGuessColummn++; // Move to the next column
    }

    // enter key is pressed
    if(letter == "enter" && currentGuessRow < 6){
      if(currentGuessColummn == 5){
        console.log("Submitting guess for row:", currentGuessRow);
        submitGuess(currentGuessRow);
        const feedback = document.getElementById("feedback");
      } else {
        setFeedback("Please input more letters before submitting a guess!");
      }
    }

    // backspace key is pressed
    if(letter == "<-" && currentGuessRow < 6){
      console.log('backspace is pressed')
      if(currentGuessColummn > 0){
        currentGuessColummn--; // Move back one column
        const cell = grid[currentGuessRow][currentGuessColummn];
        cell.textContent = ""; // Clear the cell
      }
    }
  }

function submitGuess(guessRowNumber: number){
  const guessRow = grid[guessRowNumber];
  let guess = guessRow.map((cell) => cell.textContent || "").join("");
  let correctGuesses = 0;
  if(wordList.indexOf(guess.toLowerCase()) == -1){
    setFeedback("That's not a word!");
    return;
  }

  currentGuessRow++;
  currentGuessColummn = 0;

  for(let i = 0; i < guess.length; i++){
    const cell = grid[guessRowNumber][i];

    if(wordMap.has(guess[i])){
      if(word[i] == guess[i]){
        cell.style.backgroundColor = "#84bf41";
        updateKeyColor(guess[i], "#84bf41")
        correctGuesses++;
      } else {
        cell.style.backgroundColor = "#f3b229";
        updateKeyColor(guess[i], "#f3b229")
      }
    } else {
      cell.style.backgroundColor = "#555759";
      updateKeyColor(guess[i], "#555759")
    }
  }

  if(correctGuesses == 5){
    setFeedback("YOU WIN! GREAT JOB!")
    currentGuessRow = 6;
  } else if(guessRowNumber == 5){
    setFeedback("You lost. :(");
  } else {
    setFeedback("\n");
  }
}

function updateKeyColor(letter: string, color:string){
  const key = document.getElementById('key-' + letter.toLowerCase());
  if(key){
    key.style.backgroundColor = color;
  }
}

function setFeedback(message: string) {
  const feedback = document.getElementById("feedback");
  if (feedback) {
    feedback.textContent = message;
  }
}