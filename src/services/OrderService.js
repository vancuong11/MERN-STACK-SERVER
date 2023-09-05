import Order from '../models/OrderProduct';
import Product from '../models/ProductModel';
import emailService from '../services/EmailService';

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
            isPaid,
            paidAt,
            email,
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
                    return {
                        status: 'OK',
                        message: 'SUCCESS',
                    };
                } else {
                    return {
                        status: 'OK',
                        message: 'ERROR',
                        id: order.product,
                    };
                }
            });

            const results = await Promise.all(promises);
            const newData = results && results.filter((item) => item.id || null);
            if (newData.length) {
                const arrId = [];
                newData.forEach((item) => {
                    arrId.push(item.id);
                });
                resolve({
                    status: 'ERROR',
                    message: `Sản phẩm với id${arrId.join(',')} không đủ hàng`,
                });
            } else {
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
                    isPaid: isPaid,
                    paidAt: paidAt,
                });
                if (createOrder) {
                    await emailService.sendMailCreateOrder(email, orderItems);
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                    });
                }
            }
        } catch (error) {
            //console.log(error);
            reject(error);
        }
    });
};

const getOrderDetailsService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
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

const getDetailsOrderService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id,
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

const cancelOrderDetailsService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = [];
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        sell: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            sell: -order.amount,
                        },
                    },
                    { new: true },
                );
                if (productData) {
                    order = await Order.findByIdAndDelete(id);
                    if (order === null) {
                        resolve({
                            status: 'OK',
                            message: 'The order is not defined',
                        });
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

            const newData = results && results.filter((item) => item);
            if (newData.length) {
                resolve({
                    status: 'ERROR',
                    message: `Sản phẩm với id${newData.join(',')} không đủ hàng`,
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order,
            });
        } catch (error) {
            //console.log(error);
            reject(error);
        }
    });
};

const getAllOrderService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find().sort({ createdAt: -1, updatedAt: -1 });

            resolve({
                status: 'OK',
                message: 'Get All User Success',
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
    getDetailsOrderService,
    cancelOrderDetailsService,
    getAllOrderService,
};
