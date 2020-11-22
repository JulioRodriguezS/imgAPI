import mongoose from 'mongoose';
require('dotenv').config();

let cnn = async() => {
    await mongoose.connect(process.env.DB_CONNECTION as string,{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log('db connected')})
.catch((err)=>{console.log('err', err)});
}

export default cnn();