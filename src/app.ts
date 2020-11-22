import express from 'express';
import morgan from 'morgan';
import router from './routes/index'
import path from 'path'

const app = express();

// settings

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

// static files
app.use(express.static(path.join(__dirname,'public')));

export default app;