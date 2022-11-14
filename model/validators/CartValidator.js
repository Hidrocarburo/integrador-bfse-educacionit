import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class CartValidator {
    
    static validate(product) {
        const cartProductSchema = Joi.object({
            productId: Joi.string().required().min(24).max(24),
            productQuantity: Joi.number(),
        });

        const { error } = cartProductSchema.validate(product);

        return error;
    }
}

export default CartValidator;