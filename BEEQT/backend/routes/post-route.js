const express = require("express");


const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const PostController = require("../controllers/post");

const router = express.Router();

router.post("", extractFile, PostController.createPost);

router.put("/:id", extractFile, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", PostController.deletePost);

module.exports = router;
