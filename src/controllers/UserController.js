import UserService from '../services/UserService';
import JwtService from '../services/JwtService';

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(email);
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is required',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is email',
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is equal confirmPassword',
            });
        }
        const data = await UserService.createUserService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({
            errMessage: error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(email);
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is required',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is email',
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is equal confirmPassword',
            });
        }
        const data = await UserService.loginUserService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({
            errMessage: error,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'the userId is required',
            });
        }
        const response = await UserService.updateUserService(userId, data);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'the userId is required',
            });
        }
        const response = await UserService.deleteUserService(userId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUserService();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'the userId is required',
            });
        }
        const response = await UserService.getDetailsUserService(userId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1];
        if (!token) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'the token is required',
            });
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
};
