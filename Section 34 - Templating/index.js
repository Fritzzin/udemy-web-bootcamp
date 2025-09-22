const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  res.render('subreddit', { subreddit });
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

