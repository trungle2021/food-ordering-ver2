const express = require("express");
const router = express.Router();
const UserAddressController = require("./user-address-controller");

router
  .route("/")
  .get(UserAddressController.getUserAddresses)
  .post(UserAddressController.createUserAddress)
  .put(UserAddressController.updateUserAddress);

router
  .route("/:id")
  .get(UserAddressController.getUserAddress)
  .delete(UserAddressController.deleteUserAddress);

router.route("/users/:id").get(UserAddressController.getUserAddressesByUserID);

module.exports = router;
