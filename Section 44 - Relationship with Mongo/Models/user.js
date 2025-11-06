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
  firstName: String,
  last: String,
  address: [
    {
      _id: { _id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    firstName: "Harry",
    last: "Potter",
  });
  u.address.push({
    street: "123 Sesame Street",
    city: "New York",
    state: "New York",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

const addAdress = async (id) => {
  const user = await User.findById(id);
  user.address.push({
    street: "99 3rd St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

// makeUser();
// addAdress('690d12635f52591eb82493a2');
