const User = require("../models/userModel");

exports.postUser = (req, res, next) => {
  const user = new User(req.body);
  console.log(user);
  user
    .save()
    .then((result) => {
      console.log("success");
    })
    .catch((err) => console.log(err));
};
