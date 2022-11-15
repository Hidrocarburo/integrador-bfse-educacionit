import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class OrderValidator {
    
    static validate(order) {
        const cartProductSchema = Joi.object({
            products: Joi.array().required()
        });

        const { error } = cartProductSchema.validate(order);

        return error;
    }
}

export default OrderValidator;