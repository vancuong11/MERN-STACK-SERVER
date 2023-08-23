import UserRouter from './UserRouter';
import ProductRouter from './ProductRouter';
import OrderRouter from './OrderRouter';

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/product', ProductRouter);
};

module.exports = routes;
