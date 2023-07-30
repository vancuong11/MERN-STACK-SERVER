import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import { generalAccessToken, generalRefreshToken } from './JwtService';

const createUserService = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            const checkEmail = await User.findOne({
                email: email,
            });
            if (checkEmail !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already',
                });
            }
            // mã hóa password
            const hash = bcrypt.hashSync(password, 10);
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone,
            });
            if (createUser) {
                resolve({
                    status: 'OK',
                    data: createUser,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const loginUserService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = inputData;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'The password or user is incorrect',
                });
            }
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            resolve({
                status: 'OK',
                access_token: access_token,
                refresh_token: refresh_token,
            });
            // }
        } catch (error) {
            reject(error);
        }
    });
};

const updateUserService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'Success',
                data: updateUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createUserService,
    loginUserService,
    updateUserService,
};
