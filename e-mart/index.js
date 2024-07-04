//music-Ecommerce-ui

// npm init -y , type:"module" , "dev":"nodemon index.js"
//npm i express nodemon mongoose yup
import express from "express";
import dbConnection from "./db.connect.js";
import productRoutes from "./product/product.controller.js";
import userRoutes from "./User/user.controller.js";
import cors from "cors";

const app = express();

//? To make app understand json
app.use(express.json());

//? Connect database
dbConnection();

//? CORS=> Cross Origin Resource Sharing
app.use(cors());

//? Register routes
app.use(productRoutes);
app.use(userRoutes);
// app.use("/v1", userRoutes);

//? Api version
// "/v1" use hunxa taki api version updated hos vanne tha hos

//? handling global errors
app.use((error, req, res, next) => {
  return res.status(500).send({ message: "Something went wrong." });

  next();
});

//? Network port and server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
