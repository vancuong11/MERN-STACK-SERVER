import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generalAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1h' },
    );
    return access_token;
};

export const generalRefreshToken = async (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' },
    );
    return access_token;
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
};
