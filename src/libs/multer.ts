import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import path from 'path';


const storage = multer.diskStorage({
    destination: path.join(__dirname,'../../public/images'),
    filename: (req, file, cb) => {
        console.log(uuidv4());
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const mult = multer({
    storage
}).single('image');

export default {mult}