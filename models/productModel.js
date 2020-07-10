const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor({ title, price, imageUrl, description, id }) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
  }

  save() {
    const db = getDb();
    console.log("id: ", this._id);
    if (this._id) {
      return db.collection("products").updateOne(
        { _id: mongodb.ObjectID(this._id) },
        {
          $set: this,
        }
      );
    }
    return db.collection("products").insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray();
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection("products").findOne({ _id: mongodb.ObjectID(prodId) });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: mongodb.ObjectID(prodId) });
  }
}

module.exports = Product;
