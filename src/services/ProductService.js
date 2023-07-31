import Product from '../models/ProductModel';

const createProductService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description } = dataInput;
        try {
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name product is already',
                });
            }
            const createProduct = await Product.create({
                name: name,
                image: image,
                type: type,
                countInStock: countInStock,
                price: price,
                rating: rating,
                description: description,
            });
            if (createProduct) {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: createProduct,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const updateProductService = (id, dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is defined',
                });
            }
            const updateProduct = await Product.findByIdAndUpdate(id, dataInput, { new: true });
            if (updateProduct) {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: updateProduct,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });
            if (!product) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: product,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (!checkProduct) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                });
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'Delete Product Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllProductService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.find();

            resolve({
                status: 'OK',
                message: 'Get All Product Success',
                data: product,
            });
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    createProductService,
    updateProductService,
    getDetailsProductService,
    deleteProductService,
    getAllProductService,
};
