import express from 'express';
import routerProducts from './router/products.js';
import config from './config.js';

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));

app.use(config.URL_PRODUCT_API, routerProducts);

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

server.on('error', error => console.log('Error initializing server: ' + error.message));
