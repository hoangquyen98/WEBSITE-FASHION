const express = require("express");


const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const BillController = require("../controllers/billing");

const router = express.Router();

router.post("", extractFile, BillController.createBill);

router.put("/:id", extractFile, BillController.updateBill);

router.get("", BillController.getBills);

router.get("/:id", BillController.getBill);

router.delete("/:id", BillController.deleteBill);

module.exports = router;
