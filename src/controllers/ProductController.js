import ProductService from '../services/ProductService';

const createProduct = async (req, res) => {
    try {
        const { name, image, type, countInStock, price, rating, description, discount } = req.body;
        if (!name || !image || !type || !countInStock || !price || !rating || !description || !discount) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required',
            });
        }

        const response = await ProductService.createProductService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        //console.log(error);
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The productId is required',
            });
        }

        const response = await ProductService.updateProductService(productId, data);
        return res.status(200).json(response);
    } catch (error) {
        //console.log(error);
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const ProductId = req.params.id;
        if (!ProductId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'the ProductId is required',
            });
        }
        const response = await ProductService.getDetailsProductService(ProductId);
        return res.status(200).json(response);
    } catch (error) {
        //console.log(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'the productId is required',
            });
        }
        const response = await ProductService.deleteProductService(productId);
        return res.status(200).json(response);
    } catch (error) {
        //console.log(error);
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProductService(Number(limit) || 8, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (error) {
        //console.log(error);
    }
};

const deleteManyProduct = async (req, res) => {
    try {
        const manyProductId = req.body.id;
        if (!manyProductId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'the manyProductId is required',
            });
        }
        const response = await ProductService.deleteManyProductService(manyProductId);
        return res.status(200).json(response);
    } catch (error) {
        //console.log(error);
    }
};

const getAllTypeProduct = async (req, res) => {
    try {
        const response = await ProductService.getAllTypeProductService();
        return res.status(200).json(response);
    } catch (error) {
        //console.log(error);
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllTypeProduct,
};
