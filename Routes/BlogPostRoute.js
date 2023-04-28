const express = require("express");
const { isAuthenticateUser } = require("../Middlewares/Auth");
const {
  readAllPosts,
  createNewPost,
  readSinglePost,
  updatePost,
  deletePost,
} = require("../Controllers/BlogPost");
const router = express.Router();
router.use(express.json());
router.route("/getAllPost").get(isAuthenticateUser, readAllPosts);
router.route("/getSinglePost/:id").get(isAuthenticateUser, readSinglePost);
router.route("/createNewPost").post(isAuthenticateUser, createNewPost);
router.route("/updatePost/:id").put(isAuthenticateUser, updatePost);
router.route("/deletePost/:id").delete(isAuthenticateUser, deletePost);

module.exports=router
