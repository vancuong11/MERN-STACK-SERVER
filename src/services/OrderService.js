import Order from '../models/OrderProduct';
import Product from '../models/ProductModel';

const createOrderService = (data) => {
    return new Promise(async (resolve, reject) => {
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
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            sell: +order.amount,
                        },
                    },
                    { new: true },
                );
                if (productData) {
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
                        return {
                            status: 'OK',
                            message: 'SUCCESS',
                        };
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERROR',
                        id: order.product,
                    };
                }
            });
            const results = await Promise.all(promises);
            const newData = results && results.filter((item) => item.id);
            if (newData.length) {
                resolve({
                    status: 'ERROR',
                    message: `Sản phẩm với id${newData.join(',')} không đủ hàng`,
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getOrderDetailsService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                user: id,
            });
            if (!order) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: order,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrderService,
    getOrderDetailsService,
};
