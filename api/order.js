import orderModel from "../model/order.js";
import orderValidator from '../model/validators/OrderValidator.js';

const modelOrder = new orderModel;

const createOrder = async products => {

    const validationError = orderValidator.validate(products);

    if(!validationError) {
        const createdOrder = await modelOrder.createOrder(products);
        return createdOrder;
    } else {
        console.error(`createOrder validation error: ${validationError.details[0].message}`);
        return {};
    }
};

export default {
    createOrder
};
