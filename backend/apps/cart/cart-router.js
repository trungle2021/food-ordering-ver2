const express = require("express");
const router = express.Router();
const CartController = require("../cart/cart-controller");
const validateRequest = require("../../utils/joi/validate-request-schema");
const {PARAMS, BODY}  = require("../../constant/request-types");
const {
  getCartByUserIdSchemaValidator,
  addItemSchemaValidator,
  updateItemSchemaValidator,
} = require("./cart-request-validator");


router.route("/dish/:dishId?").delete(CartController.removeItem);

router
  .route("/users/:userId?")
  .get(
    validateRequest(getCartByUserIdSchemaValidator, PARAMS),
    CartController.getCartByUserId
  );

router
  .route("/")
  .post(validateRequest(addItemSchemaValidator, BODY), CartController.addItem)
  .put(validateRequest(updateItemSchemaValidator, BODY), CartController.updateItem);

module.exports = router;
