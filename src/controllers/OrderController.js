import OrderService from '../services/OrderService';

const createOrder = async (req, res) => {
    try {
        const { paymentMethods, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body;
        if (
            !req.body
            // !paymentMethods ||
            // !itemsPrice ||
            // !shippingPrice ||
            // !totalPrice ||
            // !fullName ||
            // !address ||
            // !city ||
            // !phone
        ) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required.',
            });
        }
        const response = await OrderService.createOrderService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The user ID is required.',
            });
        }
        const response = await OrderService.getOrderDetailsService(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

const getDetailsOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The user ID is required.',
            });
        }
        const response = await OrderService.getDetailsOrderService(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

const cancelOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The user ID is required.',
            });
        }
        const response = await OrderService.cancelOrderDetailsService(orderId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrderService();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
};
