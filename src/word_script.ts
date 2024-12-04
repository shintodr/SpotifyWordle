const fs = require("fs");

fs.readFile("words_alpha.txt", "utf-8", (err: Error, data: string) => {
  if (err) {
    console.error(err);
    return;
  }

  const fiveLetterWords = data.split("\n").filter((word) => word.length === 5);
  fs.writeFile("five_letter_words.txt", fiveLetterWords.join("\n"), (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Five-letter words saved!");
  });
});