import { Router } from 'express';
import photoController from '../controllers/photo.controller';
import multer from '../libs/multer';

const router = Router();
 
router
    .get('/', photoController.getPhotos)
    .get('/:imgId', photoController.getPhoto)
    .post('/', multer.mult, photoController.createPhoto)
    .delete('/',photoController.deletePhoto)
    .put('/',photoController.updatePhoto);

export default router;