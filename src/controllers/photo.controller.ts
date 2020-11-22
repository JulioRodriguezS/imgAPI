import { json, Request, Response } from 'express';
import Photo from '../models/photo'

async function getPhotos(req: Request, res: Response): Promise<Response<any>> {
    const listImage = await Photo.find().lean();
    return res.json(listImage);
}
async function getPhoto(req: Request, res: Response): Promise<Response<any>> {
    let localResp = {}
    await Photo.findOne(req.body.imgId).lean()
        .then((data) => { localResp = { data } })
        .catch((err) => { localResp = { err_message: err } });
    return res.json(localResp);
}
async function createPhoto(req: Request, res: Response): Promise<Response<any>> {
    const { title, description } = req.body;
    const [name, originalName, imagePath] = [req.file.filename, req.file.originalname, req.file.path];
    let localResp = {};
    const newPhoto = new Photo({ name, originalName, title, description, imagePath })
    await newPhoto.save()
        .then(() => { localResp = { message: 'image successfuly saved' }; })
        .catch((err) => { localResp = { err_message: err }; })

    return res.json(localResp);
}
async function deletePhoto(req: Request, res: Response): Promise<Response<any>> {
    let localResp = {};
    const imgId = req.body.imgId;
    Photo.findByIdAndDelete(imgId)
        .then(() => { localResp = { message: 'image deleted successfuly' } })
        .catch((err) => { localResp = { err_message: err } });
    return res.json(localResp);
}

export default { getPhotos, getPhoto, createPhoto, deletePhoto }