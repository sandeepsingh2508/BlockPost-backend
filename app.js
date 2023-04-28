const express = require("express");
const app = express();
const ErrorMiddleWare = require("./Middlewares/Error");
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/UserRoute");
const blogPostRoute = require("./Routes/BlogPostRoute");

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/blogpost", blogPostRoute);
app.use(ErrorMiddleWare);

module.exports = app;
