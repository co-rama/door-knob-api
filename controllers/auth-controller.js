const bcrypt = require("bcryptjs");
const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//HELPER METHODS
const URL = process.env.URL;

const validatorHelper = (password, hashedPassword, callbak) => {
  bcrypt
    .compare(password, hashedPassword)
    .then((doMatch) => {
      if (doMatch) {
        return callbak(doMatch);
      }
      return callbak(doMatch);
    })
    .catch((error) => {
      // console.log(error);
      console.log(error);
      return callback(false);
    });
};


// CUSTOMER
exports.postCustomerRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const mobile = req.body.mobile;
  const lastname = req.body.lastname;
  try {
    const alreadyCustomer = await Customer.findOne({ email: email });
      if (alreadyCustomer) {
        return res.json({
          message: "CUSTOMER EXIST, USE other EMAIL",
          success: false,
        });
      }
      bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const customer = new Customer({
          email: email,
          firstname: firstname,
          password: hashedPassword,
          mobile: mobile,
          lastname: lastname,
        });
        return customer.save();
      })
      .then((result) => {
        if (!result) {
          const error = new Error(
            "ERROR OCCURED | COULD NOT BE REGISTERED"
          );
          error.statusCode = 500;
          throw error;
        }
        res
          .status(200)
          .json({ message: "CUSTOMER REGISTERED", success: true });
        })
        .catch((err) => {
          next(err);
        });

  } catch (error) {
    next(error);
};
}
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body);
  Customer.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error('USER NOT FOUND');
        error.statusCode = 404;
        throw error;
      }
      validatorHelper(password, user.password, (doMatch) => {
        if (!doMatch) {
          return res.status(200).json({
            message: "Either email or password is incorrect",
            isLoggedIn: false,
          });
        }
        const token = jwt.sign(
          {
            email: email,
            customerId: user._id,
          },
          "secureCustomerLine",
          { expiresIn: "1hr" }
        );
        res.status(201).json({
          success: true,
          token: token,
          email: user.email,
          customerId: user._id.toString(),
          isLoggedIn: true,
          expiresIn: 3600,
          firstname: user.firstname,
        });

      });
    })
    .catch(err => {
      next(err);
    })
  };
