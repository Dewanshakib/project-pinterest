import express from "express";
import "dotenv/config";
import ConnectToDB from "./config/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { pinRoutes } from "./routes/pinRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();
const PORT = process.env.PORT | 5000;

// miidleware
app.use(express.json());
app.use(cookieParser());

// user auth routes
app.use("/api/users", userRoutes);
// pins routes
app.use("/api/pin", pinRoutes);

app.listen(PORT, () => {
  ConnectToDB();
  console.log(`The server is running on http://localhost:${PORT}`);
});
