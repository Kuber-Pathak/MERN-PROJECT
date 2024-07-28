import mongoose from "mongoose";

const dbUserName = process.env.DB_USER_NAME;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Kuber`
    );
    console.log("DB connection Successful....");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
