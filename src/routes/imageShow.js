
import express from 'express';
import { getImage } from '../controllers/serveImageController.js';

const router = express.Router();

router.get("/:imageName", getImage)




export default router;