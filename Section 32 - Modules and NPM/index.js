const franc = require('franc');
const langs = require('langs');
const userInput = process.argv[2];


if (userInput) {
  const languageCode = franc(userInput);

  if (languageCode === 'und') {
    console.log("Couldn't define language");
  } else {
    const language = langs.where("3", languageCode);

    if (language) {
      console.log(language.name)
    } else {
      console.log("Couldn't define language")
    }
  }

} else {
  console.log("Empty user input")
}
