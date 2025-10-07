const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

app.get('/', (req,res) => {
    res.send("HOME PAGE!");
})

app.get('/dogs', (req,res) => {
    res.send("woof woof");
})

app.listen(3000, () => {
    console.log('App is running on port 3000');
})