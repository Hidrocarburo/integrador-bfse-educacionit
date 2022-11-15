import ProductModel from "../model/products.js";
import ProductValidator from '../model/validators/ProductValidator.js';

const modelProducts = new ProductModel;

///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getProducts = async () => {
    const products = await modelProducts.readProducts();
    return products;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getProduct = async id => {
    const product = await modelProducts.readProduct(id);
    return product;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {

    const validationError = ProductValidator.validate(product);

    if(!validationError) {
        if (product.productFreeShipping === 'undefined'){
            product.productFreeShipping = false;
        }

        const createdProduct = await modelProducts.createProduct(product);
        return createdProduct;
    } else {
        console.error(`createProduct validation error: ${validationError.details[0].message}`);
        return {};
    }
};

///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) => {

    const validationError = ProductValidator.validate(product);

    if(!validationError) {
        if (product.productFreeShipping === 'undefined'){
            product.productFreeShipping = false;
        }

        const updatedProduct = await modelProducts.updateProduct(id, product);
        return updatedProduct;    
    } else {
        console.error(`updateProduct validation error: ${validationError.details[0].message}`);
        return {};
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id => {
    const removedProduct = await modelProducts.deleteProduct(id);
    return removedProduct;
};


export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
