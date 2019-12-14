const express = require("express");

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);
router.post("/logingoogle", UserController.loginbygoogle);
router.post("/loginfacebook", UserController.loginbyfacebook);

router.post("", extractFile, UserController.createUser);

router.put("/:id", extractFile, UserController.updateUser);
router.put("/account/:id", extractFile, UserController.updateAccount);

router.get("", UserController.getUsers);
router.post("/passwordconfirm",UserController.paswordConfirm);

router.get("/:id", UserController.getUser);
router.get("/getUserDetails/:id", UserController.getUserDetails);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
