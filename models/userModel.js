const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart || null;
    this.id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIdx = this.cart.items.findIndex((cp) => {
      return JSON.stringify(cp._id) == JSON.stringify(product._id);
    });
    let newQty = 1;
    const updatedCartItem = [...this.cart.items];

    console.log(cartProductIdx);
    if (cartProductIdx >= 0) {
      console.log("green");
      newQty = this.cart.items[cartProductIdx].quantity + 1;
      updatedCartItem[cartProductIdx].quantity = newQty;
    } else {
      console.log("red");
      updatedCartItem.push({
        ...product,
        newQty: newQty,
      });
    }
    const updatedCart = { items: updatedCartItem };
    const db = getDb();

    return db
      .collection("users")
      .updateOne(
        { _id: mongodb.ObjectID(this.id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: mongodb.ObjectID(userId) });
  }
}

module.exports = User;
