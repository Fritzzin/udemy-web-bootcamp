const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

app.use(morgan("tiny"));

// app.use((req, res, next) => {
//   req.requestTime = Date.now();
//   console.log(req.method, req.path);
//   next();
// });

app.use("/dogs", (req, res, next) => {
  console.log("I love dogs!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  throw new AppError("Password Required!", 401);
  // res.send("Sorry, you need a password!");
  // throw new AppError(401, "Password Required!");
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

app.get("/error", (req, res) => {
  chicken.fly();
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

app.get("/admin", (req, res) => {
  throw new AppError("You're not an Admin!", 403);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

// Error handler
// app.use((err, req, res, next) => {
//   console.log("*******");
//   console.log("*ERROR*");
//   console.log("*******");
//   // When working with errors, we have to pass the error
//   // for the next middleware
//   next(err);
// });

app.use((err, req, res, next) => {
  // if no status, use 500 as default
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
