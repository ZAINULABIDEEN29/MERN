import express from "express"
import { createdUser,loginUser,logoutUser,getProfile } from "../controllers/user.controllers.js"
import { authUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userSchema, loginSchema } from "../validator/user.validator.js";

const router = express.Router();

router.post("/create", validate(userSchema), createdUser)
router.post("/login", validate(loginSchema), loginUser)
router.get("/profile", authUser, getProfile)
router.get("/logout", authUser, logoutUser)

export default router