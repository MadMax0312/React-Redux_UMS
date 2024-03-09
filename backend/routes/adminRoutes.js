import express from "express";
const router = express.Router();

import { authAdmin, getUserData, logoutAdmin } from "../controllers/adminController.js";


router.post('/login', authAdmin);
router.post('/logout', logoutAdmin);
router.route('/dashboard').get(getUserData).put(getUserData)

export default router;