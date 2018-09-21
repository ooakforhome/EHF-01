const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("express").Router();

const User = require('../models/User_model');


router.route('/')
    .get(User.userGet)
    .post(User.createUser);

router.route('/login')
    .post(User.userLogin, User.passAuth);

router.route('/logout')
    .post(User.userLogout);



//router
router.route("/api/products")
    .get(Product.getProducts)
    .post(Product.addProduct);
