const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

// Express Settings:
// Tell express how to parse the data coming from the post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol thats so funny",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "please stop, Todd",
  },
  {
    id: uuid(),
    username: "onlysayswoof",
    comment: "woof woof woof",
  },
];

app.get("/comments", (req, res) => {
  // console.log(comments);
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  // res.send('It worked');
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { ...comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const { comment: newComment } = req.body;
  const foundComment = comments.find((c) => c.id === id);

  if (foundComment) {
    foundComment.comment = newComment;
    res.redirect("/comments");
  } else {
    res.send(`Couldn't find comment with the ID ${id}`);
  }
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  // console.log(comment);
  res.render("comments/edit", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  // console.log(req.body);
  const { meat, quantity } = req.body;
  res.send(`Here's your ${quantity} ${meat} taco(s)`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
