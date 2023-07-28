import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// connect mongoose DB
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('connection successfully!');
    })
    .catch((e) => {
        console.log('connection error', e);
    });

app.use(bodyParser.json());
// routes
routes(app);

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});
