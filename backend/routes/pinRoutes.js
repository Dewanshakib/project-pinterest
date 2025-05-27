import express from "express"
import { commentOnPin, createPin, deletePinComment, getAllPins ,getSignlePin,deletePin, updatePin} from "../controllers/pinControllers.js";
import {Auth} from "../middleware/auth.js"
import uploadFile from "../middleware/multer.js"

const router = express.Router();

// create a pin
router.post("/new",Auth,uploadFile,createPin)

// get all pins
router.get("/all",getAllPins)

// get single pin
router.get("/:id",Auth,getSignlePin)

// delete pin
router.delete("/:id",Auth,deletePin)

// update pin
router.put("/:id",Auth,updatePin)

// comment on pin
router.post("/comment/:id",Auth,commentOnPin)

// delete comment on pin
router.delete("/comment/:id",Auth,deletePinComment)



export {router as pinRoutes}
