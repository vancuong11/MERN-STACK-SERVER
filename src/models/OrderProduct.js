import mongoose from 'mongoose';

const oderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                // join table product into orderProduct
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String, required: true },
        },
        paymentMethods: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, require: true },
        taxPrice: { type: Number, require: true },
        totalPrice: { type: Number, require: true },
        // join table user into orderProduct
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    },
);
const OrderProduct = mongoose.model('OrderProduct', oderSchema);
module.exports = OrderProduct;
