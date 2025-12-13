import express from 'express';
import { handleLogin, handleLogout } from '../controllers/authController.js';

const router = express.Router();


router.post("/login", handleLogin);
router.post("/logout", handleLogout);


export default router;