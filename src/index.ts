console.log("Wordle Clone Initialized!");
let currentGuessRow = 0;
let currentGuessColummn = 0;

const wordleGrid = document.getElementById("wordle-grid")

function createGrid() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            wordleGrid?.appendChild(cell);
        }
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
        button.classList.add("key");
        button.addEventListener("click", () => handleKeyPress(keyString));
        rowDiv.appendChild(button);
      });
      keyboard?.appendChild(rowDiv);
    });
  }
  
  function handleKeyPress(letter: string) {
    console.log("Key pressed:", letter); // Placeholder

    // there is space for a letter
    if(currentGuessRow < 6 && currentGuessColummn < 5){
      wordleGrid
    }
    // there is not space for a letter (do nothing?)

    // enter key is pressed

    // backspace key is pressed
  }

  function setLetter(letter: string){
    
  }
  
  createKeyboard();


  function setFeedback(message: string) {
    const feedback = document.getElementById("feedback");
    if (feedback) {
      feedback.textContent = message;
    }
}