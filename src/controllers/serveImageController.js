import path from 'path';
import fs from 'fs/promises';
import { UPLOAD_DIR } from '../config/path.js';

const getImage = async(req, res, next) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(UPLOAD_DIR, imageName);
    try {
        if(!imagePath.startsWith(UPLOAD_DIR)) {
        throw new Error('Invalid image path');  
       }

       await fs.access(imagePath);

       res.sendFile(imagePath)

    } catch (error) {
        next(error);
    }
    


}

export { getImage };