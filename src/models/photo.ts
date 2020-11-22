import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    name: {
        type: String
    },
    originalName: {
        type: String
    },
    title: {
        type: String
    },
    description:{
        type: String
    },
    imagePath:{
        type: String
    },
    savedDate: {
        type: Date,
        default: Date.now()
    }
});

interface iPhoto extends mongoose.Document{
    name: String;
    originalName: String;
    title: String;
    description: String;
    imagePath: String;
}

export default mongoose.model<iPhoto>('Photo', photoSchema);