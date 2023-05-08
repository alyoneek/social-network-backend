const express = require('express');

// const {
//   getProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/product.controller");

const router = express.Router();

router.get('/profile', () => console.log('hey'));

// router.get("/products/:id", getProduct);

// router.post("/products", createProduct);

// router.patch("/products/:id", updateProduct);

// router.delete("/products/:id", deleteProduct);

module.exports = router;
