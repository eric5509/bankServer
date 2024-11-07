import mongoose from "mongoose";

export const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to Database')
  } catch (error) {
    console.log('Couldn\'t Connect to Database')
  }
};
