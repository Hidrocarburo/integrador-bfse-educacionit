import CartModel from "../model/cart.js";
import CartValidator from '../model/validators/CartValidator.js';

const modelCart = new CartModel;

///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getCartProducts = async () => {
    const products = await modelCart.readCartProducts();
    return products;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const addCartProduct = async product => {

    const validationError = CartValidator.validate(product);

    if(!validationError) {
        const createdProduct = await modelCart.createCartProduct(product);
        return createdProduct;
    } else {
        console.error(`addCartProduct validation error: ${validationError.details[0].message}`);
        return {};
    }
};

///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateCartProductQuantity = async (id, product) => {

    const validationError = CartValidator.validate(product);

    if(!validationError) {
        const updatedProduct = await modelCart.updateCartProduct(id, product);
        return updatedProduct;
    } else {
        console.error(`updateCartProductQuantity validation error: ${validationError.details[0].message}`);
        return {};
    }
};


//////////////////////////////////////////////////////////////////////////////////
//                                API Delete ONE                                //
//////////////////////////////////////////////////////////////////////////////////

const deleteCartProduct = async id => {
    const removedProduct = await modelCart.deleteCartProduct(id);
    return removedProduct;
};

//////////////////////////////////////////////////////////////////////////////////
//                                API Delete ALL                                //
//////////////////////////////////////////////////////////////////////////////////

const deleteAllCartProducts = async () => {
    const removedProducts = await modelCart.deleteCartProducts();
    return removedProducts;
};

export default {
    getCartProducts,
    addCartProduct,
    updateCartProductQuantity,
    deleteCartProduct,
    deleteAllCartProducts
};
