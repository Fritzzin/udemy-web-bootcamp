const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const redditData = require('./data.json');

// Sets a middleware to serve files (images, audio, etc...)
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
// Utilize path.join(__dirname, ...) so that it utilizes the full path
// Doesn't matter where I run the server from, it will always find the
// correct path for the files and directories
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/cats', (req, res) => {
  const cats = [
    'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
  ];

  // Render page cats using the list of cats
  res.render('cats', { cats });
})

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  console.log(data);
  // {...data} === {data.name, data.subscribers, and so on}
  if (data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', { subreddit });
  }
})

app.get('/random', (req, res) => {
  const randomNum = Math.floor(Math.random() * 10) + 1;
  res.render('random', {
    // randomNum: randomNum or just randomNum
    randomNum
  });
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

