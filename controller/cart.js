import api from '../api/cart.js';

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getCartProducts = async (req, res) => {
    res.json(await api.getCartProducts());
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postCartProduct = async (req, res) => {
    const product = req.body;

    const newCartProduct = await api.addCartProduct(product);
    res.json(newCartProduct);
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putCartProduct = async (req, res) => {
    const productId = req.params.productid;
    const productQuantity = req.body;

    const updatedCartProduct = await api.updateCartProductQuantity(productId, productQuantity) || {};
    res.json(updatedCartProduct);
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteCartProduct = async (req, res) => {
    const productId = req.params.productid;

    const removedCartProduct = await api.deleteCartProduct(productId) || {};
    res.json(removedCartProduct);
};

const deleteAllCartProducts = async (req, res) => {
    const removedCartProduct = await api.deleteAllCartProducts() || {};
    res.json(removedCartProduct);
};


export default {
    getCartProducts,
    postCartProduct,
    putCartProduct,
    deleteCartProduct,
    deleteAllCartProducts
};
