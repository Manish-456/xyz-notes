const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .get(verifyToken, userController.getAllUsers)
  .post( userController.createNewUser)
  .patch(verifyToken, userController.updateUser)
  .delete(verifyToken, userController.deleteUser);
module.exports = router;
