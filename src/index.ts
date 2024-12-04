console.log("Wordle Clone Initialized!");
let currentGuessRow = 0;
let currentGuessColummn = 0;
let word = "PAINT";
let wordMap = new Map();

const grid: HTMLDivElement[][] = [];
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

createTargetWordMap();

function createGrid() {
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
  
    if (key >= "a" && key <= "z" && key != "enter" && key != "backspace") {
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

  function handleKeyPress(letter: string) {
    console.log("Key pressed:", letter); // Placeholder

    // there is space for a letter
    if(currentGuessRow < 6 && currentGuessColummn < 5 && letter != "enter" && letter != "<-"){
      const cell = grid[currentGuessRow][currentGuessColummn];
      cell.textContent = letter.toUpperCase(); // Set the letter in the cell
      currentGuessColummn++; // Move to the next column
    }

    // enter key is pressed
    if(letter == "enter" && currentGuessRow < 6){
      if(currentGuessColummn == 5){
        console.log("Submitting guess for row:", currentGuessRow);
        submitGuess(currentGuessRow);
        currentGuessRow++;
        currentGuessColummn = 0;
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
  const guessRow = grid[guessRowNumber]
  const guess = guessRow.map((cell) => cell.textContent || "").join("");
  let correctGuesses = 0;
  for(let i = 0; i < guess.length; i++){
    const cell = grid[guessRowNumber][i];

    const keyboard = document.getElementById("keyboard");

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