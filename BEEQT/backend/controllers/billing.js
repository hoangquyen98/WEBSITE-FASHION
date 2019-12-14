const Billing = require("../models/billing");

exports.createBill = (req, res, next) => {
  const bill = new Billing({
    firstName:req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    address1: req.body.address1,
    address2: req.body.address2,
    country: req.body.country,
    state: req.body.state
  });
  bill
    .save()
    .then(createdBill => {
      res.status(201).json({
        message: "Billing added successfully",
        bill: {
          ...createdBill,
          id: createdBill._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a bill failed!"
      });
    });
};

exports.updateBill = (req, res, next) => {

  const bill = new Billing({
    _id: req.body.id,
    firstName:req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    address1: req.body.address1,
    address2: req.body.address2,
    country: req.body.country,
    state: req.body.state
  });
  Billing.updateOne({ _id: req.params.id}, bill)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate bill!"
      });
    });
};

exports.getBills = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const billQuery = Billing.find();
  let fetchedBills;
  if (pageSize && currentPage) {
    billQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  billQuery
    .then(documents => {
      fetchedBills = documents;
      return Billing.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        bills: fetchedBills,
        maxBills: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching bills failed!"
      });
    });
};

exports.getBill = (req, res, next) => {
  Billing.findById(req.params.id)
    .then(bill => {
      if (bill) {
        res.status(200).json(bill);
      } else {
        res.status(404).json({ message: "Billing not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching bill failed!"
      });
    });
};

exports.deleteBill = (req, res, next) => {
  Billing.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting bill failed!"
      });
    });
};
