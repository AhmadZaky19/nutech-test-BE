const express = require("express");

const Router = express.Router();

const productController = require("./productController");
// const middlewareAuth = require("../../middleware/auth");
const middlewareUpload = require("../../middleware/upload");

Router.get(
  "/",
  // middlewareAuth.authentication,
  productController.getAllProduct
);
Router.post(
  "/",
  // middlewareAuth.authentication,
  middlewareUpload,
  productController.postProduct
);
Router.patch(
  "/:id",
  // middlewareAuth.authentication,
  middlewareUpload,
  productController.updateProduct
);
Router.delete(
  "/:id",
  // middlewareAuth.authentication,
  productController.deleteProduct
);

module.exports = Router;
