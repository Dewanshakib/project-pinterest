import mongoose from "mongoose";

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{dbName:"pinterest"});
    console.log(`Database connected to ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to database`);
  }
};

export default ConnectToDB;
