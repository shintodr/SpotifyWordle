var fs = require("fs");
fs.readFile("words_alpha.txt", "utf-8", function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var fiveLetterWords = data.split("\n").filter(function (word) { return word.length === 6; });
    fs.writeFile("five_letter_words.txt", fiveLetterWords.join("\n"), function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Five-letter words saved!");
    });
});
