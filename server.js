import express from 'express';
import routerProducts from './router/products.js';
import routerCart from './router/cart.js';
import routerOrder from './router/order.js';
import config from './config.js';

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(config.URL_PRODUCT_API, routerProducts);
app.use(config.URL_CART_API, routerCart);
app.use(config.URL_ORDER_API, routerOrder);

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

server.on('error', error => console.log('Error initializing server: ' + error.message));
