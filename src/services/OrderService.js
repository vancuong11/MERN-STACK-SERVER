import Order from '../models/OrderProduct';

const createOrderService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                orderItems,
                paymentMethods,
                itemsPrice,
                shippingPrice,
                totalPrice,
                fullName,
                address,
                city,
                user,
                phone,
            } = data;
            const createOrder = await Order.create({
                orderItems: orderItems,
                shippingAddress: {
                    fullName: fullName,
                    address: address,
                    city: city,
                    phone: phone,
                },
                paymentMethods: paymentMethods,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                totalPrice: totalPrice,
                user: user,
            });
            if (createOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createOrder,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrderService,
};
