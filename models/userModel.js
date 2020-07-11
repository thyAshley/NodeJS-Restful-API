const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User needs to have a name"],
  },
  email: {
    type: String,
    required: [true, "User needs to have a email"],
  },
});

const User = mongoose.model("user", (schema = userSchema));
module.exports = User;
