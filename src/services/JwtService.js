import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generalAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '30s' },
    );
    return access_token;
};

const generalRefreshToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' },
    );
    return access_token;
};
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authentication',
                    });
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin,
                });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token: access_token,
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService,
};
