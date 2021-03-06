const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookie_parser = require("cookie-parser");
const bodyParser = require('body-parser');

const app = express();
require("dotenv").config();

// ROUTES IMPORTS
const authRoute = require("./routes/auth-route");
const tenantRoute = require("./routes/tenant-route");

// OBJECT
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );
  // res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});

//ROUTES USAGE
app.use("/account", authRoute);
app.use("/tenants", tenantRoute);

app.use("/", (req, res, next) => {
  res.status(200).json({api : "Welcome to Door-knob Backend"});
  next();
});
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err._message ? err._message : err.message;
  const notSuccess = err.notSuccess ? err.notSuccess : false;
  if (err != null) {
    res.status(status).json({ message: message, notSuccess: notSuccess });
  }
  // DISPLAY ERROR MESSAGE DURING DEVELOPMENT
  console.log(err);
  next();
});

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then((result) => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Server running on PORT: " + PORT);
    });
  })
  .catch((err) => {
    console.log("Error occured to DB");
    console.log(err);
    app.listen(PORT, null, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Server running without DB");
    });
  });
