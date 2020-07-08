const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, prodPrice) {
    fs.readFile(p, "utf-8", (err, fileContent) => {
      let cart =
        fileContent === ""
          ? { products: [], totalPrice: 0 }
          : JSON.parse(fileContent);
      console.log(cart);
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += +prodPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, "utf-8", (err, fileContent) => {
      if (err) return null;

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.findIndex((prod) => prod.id == id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id != id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      3;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
