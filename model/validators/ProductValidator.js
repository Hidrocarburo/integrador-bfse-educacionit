import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class ProductValidator {
    
    static validate(product) {

        const productSchema = Joi.object({
            productName: Joi.string().required().min(1).max(30).pattern(new RegExp('^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñüÜ \'",./\-_¿?¡!]+$')),
            productImg: Joi.required(),
            productBrand: Joi.string().required().min(1).max(40).pattern(new RegExp('^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñüÜ \'",./\-_¿?¡!]+$')),
            productCategory: Joi.string().required().min(1).max(50).pattern(new RegExp('^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñüÜ \'",./\-_¿?¡!]+$')),
            productShortDesc: Joi.string().required().min(1).max(80),
            productLongDesc: Joi.string().required().min(1).max(2000),
            productMinAge: Joi.number().required().min(0),
            productMaxAge: Joi.number().required().min(Joi.ref('productMinAge') || 0),
            productStock: Joi.number().required().min(1),
            productPrice: Joi.number().required().min(1),
            productFreeShipping: Joi.bool(),
            id: Joi.allow()
        });

        const { error } = productSchema.validate(product);

        return error;
    }
}

export default ProductValidator;