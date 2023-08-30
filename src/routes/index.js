import UserRouter from './UserRouter';
import ProductRouter from './ProductRouter';
import OrderRouter from './OrderRouter';
import PaymentRouter from './PaymentRouter';

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/payment', PaymentRouter);
};

module.exports = routes;
