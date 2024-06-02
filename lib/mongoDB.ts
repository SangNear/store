import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "BorcellAdmin",
    });
    isConnected = true;
    console.log("Mongodb is connected");
    
  } catch (error) {
    console.log(error);
  }
};
