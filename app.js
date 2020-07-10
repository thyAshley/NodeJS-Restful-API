const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const errorController = require("./controllers/errorController");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const CartItem = require("./models/cartItemModel");
const OrderItem = require("./models/orderItemModel");
const Order = require("./models/orderModel");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.hasMany(OrderItem);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    User.findByPk(1)
      .then((user) => {
        if (!user) {
          return User.create({
            name: "Max",
            email: "Dummy@test.com",
          });
        }
        return user;
      })
      .then((user) => {
        console.log("User created");
        return user.createCart();
      })
      .then((cart) => {
        console.log("cart created");
        app.listen(3000, () => {
          console.log("server started on port 3000");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
