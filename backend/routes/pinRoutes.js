import express from "express"
import { commentOnPin, createPin, getAllPins ,getSignlePin} from "../controllers/pinControllers.js";
import {Auth} from "../middleware/auth.js"
import uploadFile from "../middleware/multer.js"

const router = express.Router();

// create a pin
router.post("/new",Auth,uploadFile,createPin)

// get all pins
router.get("/all",getAllPins)

// get single pin
router.get("/:id",Auth,getSignlePin)

// comment on pin
router.post("/comment/:id",Auth,commentOnPin)

export {router as pinRoutes}
