const express = require("express");


const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const ProductController = require("../controllers/product");

const router = express.Router();

router.post("", extractFile, ProductController.createProduct);

router.put("/:id", extractFile, ProductController.updateProduct);

router.get("", ProductController.getProducts);

router.get("/getProductDetails/:id", ProductController.getProduct);

router.delete("/delete/:id",ProductController.deleteProduct);

module.exports = router;
