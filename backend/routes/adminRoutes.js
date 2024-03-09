import express from "express";
const router = express.Router();

import { authAdmin, getUserData, logoutAdmin } from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

router.post('/login', authAdmin);
router.post('/logout', logoutAdmin);
router.route('/dashboard').get(protect, getUserData).put(protect, getUserData)

export default router;