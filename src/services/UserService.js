const createUserService = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve({});
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createUserService,
};
