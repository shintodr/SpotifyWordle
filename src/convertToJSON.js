const fs = require('fs');

// Read the five_letter_words.txt file
fs.readFile('five_letter_words.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the data into words and filter out empty lines or non-5-letter words
  const words = data
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length === 5);

  // Write the filtered words to a JSON file
  fs.writeFile('five_letter_words.json', JSON.stringify(words, null, 2), (err) => {
    if (err) {
      console.error('Error writing the JSON file:', err);
    } else {
      console.log('five_letter_words.json has been created!');
    }
  });
});