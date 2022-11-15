import express from 'express';
import orderController from '../controller/order.js';

const routerOrder = express.Router();

routerOrder.post('/', orderController.postOrder);

export default routerOrder;
