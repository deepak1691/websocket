import { Router } from "express";
import { registerUser,loginUser,userData } from "../controllers/user.auth.js";
import {authMiddleware} from "../middleware/auth.user.js";
import { signupSchema,loginSchema } from "../models/schemaValidation/schemaValidate.js";
import { validate } from "../middleware/validate.js";

const router=Router();

router.route("/register").post(validate(signupSchema),registerUser);
router.route("/login").post(validate(loginSchema),loginUser);
router.route("/users").get(authMiddleware,userData);

export default router;