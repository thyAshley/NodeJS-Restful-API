// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("node-complete", "root", "test123", {
//   dialect: "mysql",
//   host: "localhost",
//   logging: false,
// });

// module.exports = sequelize;

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

console.log(process.env.MONGO_PASSWORD);
const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://admin-ashley:${process.env.MONGO_PASSWORD}@testdb-ukelm.mongodb.net/<dbname>?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected to MongoDB Atlas");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
