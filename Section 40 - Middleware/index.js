const express = require("express");
const app = express();
const morgan = require("morgan");

// app.use(morgan("common"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I love dogs!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  res.send("Sorry, you need a password!");
};

// app.use((req, res, next) => {
//   console.log("First middleware");
//   return next();
// });

// app.use((req, res, next) => {
//   console.log("Second middleware");
//   return next();
// });

app.get("/", (req, res) => {
  res.send("HOME PAGE!");
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("woof woof");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send(
    "My secret is: Sometimes I wear headphones in public so I don't have to talk to anyone."
  );
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
