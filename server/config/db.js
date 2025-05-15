import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL); // connecting our MongoDB URL with the mongoose to get the access of the MongoDB database
    console.log(
      `Successfully connected to MongoDB database ${conn.connection.host}`
        .bgMagenta.white
    );
  } catch (error) {
    console.log(
      `Error in connecting to the MongoDB database: ${error}`.bgRed.white
    );
  }
};

export default connectDB;
