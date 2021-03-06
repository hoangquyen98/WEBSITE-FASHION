const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const product = new Product({
    productId: req.body.productId,
    productName: req.body.productName,
    productCategory: req.body.productCategory,
    productPrice: req.body.productPrice,
    productDescription: req.body.productDescription,
    productImageUrl:req.body.productImageUrl,
    productAdded: req.body.productAdded,
    productQuatity: req.body.productQuatity,
    ratings: req.body.ratings,
    favourite: req.body.favourite,
    productSeller: req.body.productSeller,
  });
  product
    .save()
    .then(createProduct => {
      console.log(createProduct)
      res.status(201).json({
        message: "Product added successfully",
        product: {
          ...createProduct,
          id: createProduct._id
        }
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Creating a product failed!"
      });
    });
};

exports.updateProduct = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/products/" + req.file.filename;
  }
  const product = new Product({
    _id: req.body.id,
    productId: req.body.productId,
    productName: req.body.productName,
    productCategory: req.body.productCategory,
    productPrice: req.body.productPrice,
    productDescription: req.body.productDescription,
    productImageUrl:req.body.productImageUrl,
    productAdded: req.body.productAdded,
    productQuatity: req.body.productQuatity,
    ratings: req.body.ratings,
    favourite: req.body.favourite,
    productSeller: req.body.productSeller,
  });
  product.updateOne({ _id: req.params.id}, product)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate product!"
      });
    });
};

exports.getProducts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const productQuery = Product.find();
  let fetchedProducts;
  if (pageSize && currentPage) {
    productQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  productQuery
    .then(documents => {
      fetchedProducts = documents;
      return Product.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts,
        maxProducts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching products failed!"
      });
    });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "product not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching product failed!"
      });
    });
};


exports.deleteProduct = (req, res, next) => {
  console.log(1);

  Product.deleteOne({ _id: req.params.id})
    .then(result => {
      res.status(200).json({ message: "Deletion successful!" });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Deleting products failed!"
      });
    });
};
