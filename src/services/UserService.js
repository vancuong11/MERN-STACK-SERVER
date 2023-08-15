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
                    status: 'ERROR',
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
        const { email, password } = inputData;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: 'ERROR',
                    message: 'The user is not defined',
                });
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'ERROR',
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

const deleteUserService = (id) => {
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

            await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete User Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.find();

            resolve({
                status: 'OK',
                message: 'Get All User Success',
                data: user,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });
            if (!user) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: user,
            });
        } catch (error) {
            reject(error);
        }
    });
};
const deleteManyUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: id });

            resolve({
                status: 'OK',
                message: 'Delete User Success',
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
    deleteUserService,
    getAllUserService,
    getDetailsUserService,
    deleteManyUserService,
};
