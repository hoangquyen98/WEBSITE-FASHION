const express = require("express");


const checkAuth = require("../middleware/check-auth");
const OrderController = require("../controllers/order");

const router = express.Router();

router.post("/createOrder", OrderController.createOrder);
router.post("/orderconfirm", OrderController.orderConfirm);

// router.get("", PostController.getPosts);

// router.get("/:id", PostController.getPost);

// router.delete("/:id", PostController.deletePost);

module.exports = router;
