import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';

const imagePath = path.join(__dirname,'../../public/images');
const storage = multer.diskStorage({
    destination: imagePath,
    filename: (req, file, cb) => {
        console.log(uuidv4());
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const mult = multer({
    storage,
    dest:imagePath
}).single('image');

export default {mult}