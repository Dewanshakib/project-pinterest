import express from "express";
import "dotenv/config"
import ConnectToDB from "./config/db.js";
import {userRoutes} from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT | 5000;

// miidleware
app.use(express.json())
app.use(cookieParser())

// methods
app.use("/api/users",userRoutes)

app.listen(PORT, () => {
  ConnectToDB()
  console.log(`The server is running on http://localhost:${PORT}`);
});
