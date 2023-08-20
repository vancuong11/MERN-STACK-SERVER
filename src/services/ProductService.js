import Product from '../models/ProductModel';

const createProductService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description, discount } = dataInput;
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
                discount: discount,
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

const getAllProductService = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count();
            if (filter) {
                const label = filter[0];
                const productFilter = await Product.find({ [label]: { $regex: filter[1] } });
                resolve({
                    status: 'OK',
                    message: 'Get All Product Success',
                    data: productFilter,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            if (sort) {
                const objSort = {};
                objSort[sort[1]] = sort[0];
                const productSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objSort);

                resolve({
                    status: 'OK',
                    message: 'Get All Product Success',
                    data: productSort,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            // pagination
            const product = await Product.find()
                .limit(limit)
                .skip(page * limit)
                .sort({
                    name: sort,
                });
            resolve({
                status: 'OK',
                message: 'Get All Product Success',
                data: product,
                total: totalProduct,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalProduct / limit),
                // totalPage: totalProduct / limit,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteManyProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: id });

            resolve({
                status: 'OK',
                message: 'Delete Product Success',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllTypeProductService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type');

            resolve({
                status: 'OK',
                message: 'Get All Type Product',
                data: allType,
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
    deleteManyProductService,
    getAllTypeProductService,
};
