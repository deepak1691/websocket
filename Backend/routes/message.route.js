import express from "express";
import {sendMessage,getMessage} from '../controllers/sendMessage.controllers.js';
import { authMiddleware } from "../middleware/auth.user.js";

const router=express.Router();

router.route("/send/:id").post(authMiddleware,sendMessage);
router.route("/get/:id").get(authMiddleware,getMessage);

export default router;