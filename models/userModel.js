const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor({ username, email }) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("user").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("user").findOne({ _id: mongodb.ObjectID(userId) });
  }
}

module.exports = User;
