import express from "express";
const router = express.Router();

import { authAdmin, deleteUserData, editUserData, getUserData, getUsersProfile, logoutAdmin } from "../controllers/adminController.js";

import { adminProtect } from "../middleware/authMiddleware.js";

router.post('/login', authAdmin);
router.post('/logout', logoutAdmin); 
router.route('/dashboard').get(getUserData)
router.route('/editUser/:id').get(getUsersProfile).put(adminProtect, editUserData)
router.post('/deleteUser/:id', deleteUserData);

export default router;