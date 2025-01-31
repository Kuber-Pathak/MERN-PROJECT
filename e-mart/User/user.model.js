import mongoose from "mongoose";

//? Set rule/schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    unique: true, //index
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

//? Create table/model/collection
const User = mongoose.model("User", userSchema);

export default User;
