const express = require("express");
const {
  createUser,
  loginUser,
  logOut,
  getAllUsers,
  getSingleUser,
} = require("../Controllers/User");
const { isAuthenticateUser } = require("../Middlewares/Auth");
const router = express.Router();

router.use(express.json());
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/getAllUsers").get(isAuthenticateUser, getAllUsers);
router.route("/getSingleUser/:id").get(isAuthenticateUser, getSingleUser);

module.exports=router
