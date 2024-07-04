import express from "express";
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

//? Register User
router.post("/user/register", async (req, res) => {
  //extract new user from req.body
  const newUser = req.body;

  //Check uniqueness of email
  const user = await User.findOne({ email: newUser.email });
  //if user exist throw error
  if (user) {
    return res.status(409).send({ message: "Email already exists...." });
  }

  //hash password before inserting
  const plainPassword = newUser.password;
  const saltRound = 10; // 1 to 32 //!adds randomness to generated password => salt round
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
  newUser.password = hashedPassword;

  //save user
  await User.create(newUser);

  //send response
  return res.status(200).send({ message: "User registered successfully...." });
});

//? Login User

router.post("/user/login", async (req, res) => {
  //extract new user from req.body
  const loginCredentials = req.body;

  //find user using email
  const user = await User.findOne({ email: loginCredentials.email });

  //If not user throw error
  if (!user) {
    return res.status(404).send({ message: "Invalid Credentials." });
  }

  //check for password match
  const plainPassword = loginCredentials.password;
  const hashedPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordMatch) {
    return res.status(409).send({ message: "Invalid Credentials." });
  }

  //generate token //! we use JSON web token
  const payload = { email: user.email }; //_id can also be used.For recognition of whose token is.
  const signature = process.env.ACCESS_TOKEN_KEY;

  const token = jwt.sign(payload, signature);

  //hide hash password
  user.password = undefined;

  //send response
  return res.status(200).send({
    message: "Login successful.",
    accessToken: token,
    userDetails: user,
  });
});
export default router;
