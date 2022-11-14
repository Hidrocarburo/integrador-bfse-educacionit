import express from 'express';
import cartController from '../controller/cart.js';

const routerCart = express.Router();

routerCart.get('/', cartController.getCartProducts);
routerCart.post('/', cartController.postCartProduct);
routerCart.delete('/', cartController.deleteAllCartProducts);
routerCart.put('/:productid', cartController.putCartProduct);
routerCart.delete('/:productid', cartController.deleteCartProduct);

export default routerCart;
