//import library
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const router = require("./router/routers");

//add middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//configure the application
//CROS setting
app.use(function (req, resp, next) {
  resp.setHeader("Access-Control-Allow-origin", "*");
  resp.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
  resp.setHeader("Access-Control-Allow-Heades", "content-Type");
  resp.setHeader("Access-control-Allow-Credentials", true);
  next();
})
//add url handler
app.use("/", router);

//start the server
app.listen(3004, function () {
  console.log("server is start at port no. 3004");
})

module.exports = app;
