import api from '../api/order.js';

///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postOrder = async (req, res) => {
    const products = req.body;

    const newCartProduct = await api.createOrder(products);
    res.json(newCartProduct);
};

export default {
    postOrder
}
