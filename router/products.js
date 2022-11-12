import express from 'express';
import productsController from '../controller/products.js';
import multerParams from './params/multerParams.js'

const routerProducts = express.Router();

routerProducts.get('/', productsController.getProducts);
routerProducts.get('/:id', productsController.getProduct);
routerProducts.post('/', multerParams.single('productImg'), productsController.postProduct);
routerProducts.put('/:id', multerParams.single('productImg'), productsController.putProduct);
routerProducts.delete('/:id', productsController.deleteProduct);

export default routerProducts;
