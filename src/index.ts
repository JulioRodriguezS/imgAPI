import app from './app';
import cnn from './database';


async function main(){
    await cnn;
    const port = process.env.PORT || 3000;
    
    await app.listen(port,()=>{
        console.log('server on port:', port)
    });
}
main();
