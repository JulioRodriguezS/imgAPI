import { json, Request, Response } from 'express';
import Photo from '../models/photo'

const fs = require('fs')

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
    let localResp = [{}];
    const imgId = req.body.imgId;
    await Photo.findByIdAndDelete(imgId)
        .then(async (data) => {
            localResp.push({ message: 'image deleted successfuly' });
            try {
                if (data) {
                    await fs.unlink(data.imagePath.toString(), (err: any) => {
                        if (err) localResp.push({ err_message: 'there was a problem when trying to remove the file' + err });
                        localResp.push({ message: 'removed from files' });
                    });
                }
            } catch (err) {
                localResp.push({ err_message: 'can not was posible removed from files' + err });
            }
        })
        .catch((err) => { localResp.push({ err_message: err }) });
    return res.json(localResp);
}
async function updatePhoto(req: Request, res: Response): Promise<Response<any>> {
    const { imgId, title, description } = req.body;
    let localResp = {};
    await Photo.findByIdAndUpdate(imgId, {title, description})
        .then((data) => { localResp = { message: 'succesfully upload', data } })
        .catch((err) => { localResp = { err_message: 'can not be possible to upload: ' + err } });

    return res.json(localResp);
}

export default { getPhotos, getPhoto, createPhoto, deletePhoto, updatePhoto }