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
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.method.log = function () {
  console.log("working");
};

userSchema.method("addToCart", function (product) {
  const cartProductIdx = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let qty = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIdx >= 0) {
    qty = this.cart.items[cartProductIdx].quantity + 1;
    updatedCartItems[cartProductIdx].quantity = qty;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: qty,
    });
  }
  this.cart = {
    ...this.cart,
    items: updatedCartItems,
  };
  return this.save();
});

userSchema.methods.removeFromCart = function (product) {
  const cartItems = [...this.cart.items].filter((cp) => {
    return cp.productId.toString() !== product.toString();
  });
  this.cart = {
    items: cartItems,
  };
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};
module.exports = mongoose.model("User", (schema = userSchema));
