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
        console.log(error);
        return res.status(400).json({
            message: error,
        });
    }
};

module.exports = {
    createOrder,
};
