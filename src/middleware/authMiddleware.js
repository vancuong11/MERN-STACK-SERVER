import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'the authentication',
            });
        }
        if (user?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'the authentication',
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'the authentication',
            });
        }
        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'the authentication',
            });
        }
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
};
