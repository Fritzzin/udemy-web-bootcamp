const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipDB")
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO, CONNECTION ERROR");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  userName: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
  //   const user = new User({ userName: "Chickenfan99", age: 61 });
  const user = await User.findOne({ userName: "Chickenfan99" });
  //   const tweet1 = new Tweet({ text: "omg I love my chicken family!", likes: 0 });
  //   tweet1.user = user;
  const tweet2 = new Tweet({ text: "bock bock bock", likes: 999 });
  tweet2.user = user;
  tweet2.save();
};

// makeTweets();

const findTweets = async () => {
  const t = await Tweet.find({}).populate('user');
  console.log(t);
};

findTweets();
