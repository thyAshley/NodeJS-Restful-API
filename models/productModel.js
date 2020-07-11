// const mongodb = require("mongodb");

// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     console.log("id: ", this._id);
//     if (this._id) {
//       return db.collection("products").updateOne(
//         { _id: mongodb.ObjectID(this._id) },
//         {
//           $set: this,
//         }
//       );
//     }
//     return db.collection("products").insertOne(this);
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection("products").find().toArray();
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: mongodb.ObjectID(prodId) })
//       .next();
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: mongodb.ObjectID(prodId) });
//   }
// }
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "image is required for product"],
  },
});

const Product = mongoose.model("product", (schema = productSchema));
module.exports = Product;
