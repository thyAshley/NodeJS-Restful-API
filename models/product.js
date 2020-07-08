const fs = require("fs");
const path = require("path");
const Cart = require("./cartModel");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, "utf-8", (err, fileContent) => {
    if (!fileContent) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      const existingProductIndex = products.findIndex(
        (prod) => prod.id === this.id
      );
      console.log(existingProductIndex);
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id == this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) console.log(err);
        });
      } else {
        this.id = products.length;
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id == id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      console.log(product, updatedProducts);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteById(id, product.price);
        }
      });
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => {
        return prod.id == id;
      });
      cb(product);
    });
  }
};
