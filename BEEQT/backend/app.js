const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/post-route');
const userRoutes = require('./routes/user-route');
const productRoutes = require('./routes/product-route');
const billRoutes = require('./routes/billing-route');
const orderRoutes = require('./routes/order-route');

const app = express();

mongoose
 .connect("mongodb://annie:" + process.env.MONGO_ATLAS_PW + "@cluster0-shard-00-00-sc1hw.mongodb.net:27017,cluster0-shard-00-01-sc1hw.mongodb.net:27017,cluster0-shard-00-02-sc1hw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&w=majority", { useNewUrlParser: true })
 .then(()=>{
   console.log('Connected to database!')
 })
 .catch(()=>{
  console.log('Connected failed!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));
app.use("/images/products", express.static(path.join("backend/images/products")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/order", orderRoutes);
module.exports = app;



