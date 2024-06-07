import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO);
    console.log(
      `Connected to mongoDB database: ${con.connection.name}`.bgMagenta.white
    );
  } catch (error) {
    console.log("Connection failed");
  }
};

export default connectDB;
