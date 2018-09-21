const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("express").Router();

//Models
const Product = require('../models/Product_model');

//router
router.route("/api/products")
    .get(Product.getProducts)
    .post(Product.addProduct);

router.route("/api/product/:_id")
    .get(Product.getProductsById)
    .put(Product.updateProduct)
    .delete(Product.deleteProduct);

router.route("/api/products/:Category_type")
    .get(Product.getCategory);
router.route("/api/products/:")
    .get(Product.renderSearch);

module.exports = router;
