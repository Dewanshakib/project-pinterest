import express from "express";
import { getMyProfile, loginUser, registerUser ,getProfile,followAndUnfollowUser,logOutUser} from "../controllers/userControllers.js";
import { Auth } from "../middleware/auth.js";

const router = express.Router();

// register user
router.post("/register", registerUser);
// login
router.post("/login", loginUser);
// Logout user
router.get("/logout",Auth,logOutUser)
// protected route
router.get("/my-profile",Auth,getMyProfile)
// get user by id (protected)
router.get("/:id",Auth,getProfile)

// follow&unfollow user route
router.post("/follow/:id",Auth,followAndUnfollowUser)



export { router as userRoutes };
