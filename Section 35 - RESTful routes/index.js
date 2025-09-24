const express = require('express');
const app = express();
const PORT = 3000;

// Tell express how to parse the data coming from the post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/tacos', (req, res) => {
  res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
  console.log(req.body);
  const { meat, quantity } = req.body;
  res.send(`Here's your ${quantity} ${meat} taco(s)`)
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
