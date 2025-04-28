import { Router } from "express";
import { registerUser,loginUser,userData, uploadImage } from "../controllers/user.auth.js";
import {authMiddleware} from "../middleware/auth.user.js";
import { signupSchema,loginSchema } from "../models/schemaValidation/schemaValidate.js";
import { validate } from "../middleware/validate.js";
import { storage } from "../cloudConfig.js";
import multer from "multer";


const upload=multer({storage});

const router=Router();

router.route("/register").post(validate(signupSchema),registerUser);
router.route("/login").post(validate(loginSchema),loginUser);
router.route("/users").get(authMiddleware,userData);
router.route("/upload/:id").post(upload.single("image"), uploadImage);


export default router;