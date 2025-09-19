const express = require('express');
const app = express();

// console.dir(app);

// app.use((req, res) => {
// console.log('We got a new request')
// res.send('Hello, we got your request.')
// res.send({ color: 'red' })
// })

// Routing example
app.get('/', (req, res) => {
  res.send("This is the home page!");
})

// : means a variable
app.get('/r/:subreddit', (req, res) => {
  console.log(req.params)
  const { subreddit } = req.params;
  res.send(`Welcome to the ${subreddit} subreddit`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
  console.log(req.params)
  const { subreddit, postId } = req.params;
  res.send(`Welcome to the post ${postId} from the ${subreddit} subreddit`);
})


app.get('/cats', (req, res) => {
  console.log('Cat requested');
  res.send('Meow');
})

app.post('/cats', (req, res) => {
  res.send('POST REQUEST TO /cats!!!')
})

app.get('/dogs', (req, res) => {
  console.log('Dog requested');
  res.send('Woof');
})

app.get('/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.send('<h1> Nothing found in the search! </h1>');
  } else {
    res.send(`<h1> Search results for ${q}!</h1>`);
  }
  console.log(req.query);
})

// Treating any other paths that doesn't exist. Cannot be first
app.get(/(.*)/, (req, res) => {
  res.send(`I don't know that path`)
})


app.listen(8080, () => {
  console.log('Listening on port 8080')
})
