import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// connect mongoose DB
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('connection DB successfully!');
    })
    .catch((e) => {
        console.log('connection error', e);
    });
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// routes
routes(app);

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
