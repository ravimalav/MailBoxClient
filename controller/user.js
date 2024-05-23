const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const { use } = require("../routes/user");
const { response } = require("express");

const createJwtToken = (id) => {
  return jwt.sign({ userId: id }, "secretkey");
};

exports.signup = async (req, res) => {
  console.log("constroller");
  try {
    const { email, password } = req.body;
    console.log("value of req.body is", req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ response: "form's input field value is empty" });
    }
    const isUserExist = await User.findOne({ where: { email: email } });
    if (isUserExist) {
      return res.status(400).json({ response: "user already exist" });
    }
    const saltRound = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await User.create({
      email: email,
      password: encryptedPassword,
    });
    return res.status(200).json({
      response: "Your account has been created",
      success: true,
      token: createJwtToken(newUser.id),
    });
  } catch (err) {
    console.log("error in sign up", err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findAll({ where: { email: email } }); // find all will return an array
    console.log("existing user", user);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res
            .status(400)
            .json({ response: "password is incorrect", success: false });
        }
        if (result == true) {
          return res.status(200).json({
            response: "login successfully",
            success: true,
            token: createJwtToken(user[0].id),
          });
        }
      });
    } else {
      return res
        .status(400)
        .json({ response: "user is not registered", success: false });
    }
  } catch (err) {
    console.log("Can't log in at this time", err);
  }
};
