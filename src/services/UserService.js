import User from '../models/UserModel';

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
            const createUser = await User.create({
                name,
                email,
                password,
                confirmPassword,
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

module.exports = {
    createUserService,
};
