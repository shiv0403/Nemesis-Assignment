const User = require("../models/User");
const { createToken } = require("../utils/jwt");
const { handleErrors } = require("../utils/authrErrors");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.email);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    });
    res.status(200).send(token);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).send(errors);
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id, user.email);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Unable to signup" });
  }
};

module.exports = { login, signup };
