const products = [];
const fs = require("fs");
const path = require("path");

const getProductsFromFile = (cb) => {
  const p = path.join(__dirname, "..", "data.json");

  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    } else {
      return cb(JSON.parse(data));
    }
  });
};

exports.Product = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(
        path.join(__dirname, "..", "data.json"),
        JSON.stringify(products),
        (err) => {
          if (err) console.log(err);
        }
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};