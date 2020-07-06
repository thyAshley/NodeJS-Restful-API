const products = [];
const fs = require("fs");
const path = require("path");

exports.Product = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    fs.readFile(path.join(__dirname, "..", "data.json"), (err, file) => {
      let products = [];
      if (!err) {
        products = JSON.parse(file);
      }
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
    fs.readFile(path.join(__dirname, "..", "data.json"), (err, data) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(data));
      }
    });
  }
};
