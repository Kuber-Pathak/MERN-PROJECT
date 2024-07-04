import express from "express";
import Product from "./product.model.js";
import mongoose from "mongoose";
import { isValidUser } from "./user.authorize.js";

// routes are called controller
const router = express.Router();

//? Add product
router.post("/product/add", isValidUser, async (req, res) => {
  //  extract new product from req.body
  const newProduct = req.body;

  // add product
  await Product.create(newProduct);

  // send res
  return res.status(200).send({ message: "Product is added successfully." });
});

//? Get all the product
router.post("/product/list", isValidUser, async (req, res) => {
  const category = req?.body?.category;
  let match = {};
  if (category) {
    match = { category: category };
  }
  const products = await Product.find(match, {
    name: 1,
    image: 1,
    brand: 1,
    price: 1,
    description: 1,
  });

  // send product as response
  return res.status(200).send({ message: "success", productList: products });
});

//? Get product detail by id
router.get("/product/detail/:id", isValidUser, async (req, res) => {
  // extract product id from req.params
  const productId = req.params.id;

  // check for  mongo id validity
  const isValidId = mongoose.isValidObjectId(productId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product using product id
  const product = await Product.findOne({ _id: productId });

  // if not product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // send product as response
  return res.status(200).send({ message: "success", productDetail: product });
});

//? Delete by id
router.delete("/product/delete/:id", isValidUser, async (req, res) => {
  //Extract product id from req.params.id
  const productID = req.params.id;

  //check for mongodb validation
  const isValid = mongoose.isValidObjectId(productID);

  //If not valid mongo id throw error
  if (!isValid) {
    return res.status(400).send({ message: "Invalid MongoID.." });
  }

  //Find product
  const product = await Product.findOne({ _id: productID });

  //If product not found throw error
  if (!product) {
    return res.status(404).send({ message: "Product not Found.." });
  }

  //Delete product
  await Product.deleteOne({ _id: productID });

  //Send response
  return res.status(200).send({ message: "Product deleted successfully.." });
});

//? Edit product by id
router.put("/product/edit/:id", isValidUser, async (req, res) => {
  const productID = req.params.id;

  const validID = mongoose.isValidObjectId(productID);

  if (!validID) {
    return res.status(400).send({ message: "Invalid Mongo id " });
  }

  const product = await Product.findOne({ _id: productID });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  const newValues = req.body;
  await Product.updateOne(
    { _id: productID },
    {
      $set: {
        ...newValues,
      },
    }
  );
  return res.status(200).send({ message: "Product Updated Successfully" });
});

export default router;
