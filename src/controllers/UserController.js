import UserService from '../services/UserService';

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const data = await UserService.createUserService();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({
            errMessage: error,
        });
    }
};

module.exports = {
    createUser,
};
