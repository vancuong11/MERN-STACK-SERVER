import UserRouter from './UserRouter';
import ProductRouter from './ProductRouter';

const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
};

module.exports = routes;
