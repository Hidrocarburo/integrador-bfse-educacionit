import mongoose from "mongoose";
import DBMongoDB from "./DBMongoDB.js";

// Esquema del documento Cart
const cartProductSchema = mongoose.Schema({
    productId: String,
    productQuantity: Number
});

// Modelo del documento almacenado en una colección
const CartProductsModel = mongoose.model('cart', cartProductSchema);


class CartModelMongoDB {

    // CRUD - C: CREATE
    async createCartProduct(product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const existingProduct = await this.readCartProductByProductId(product.productId);
            
            if(existingProduct !== null){
                const newProductQuantity = Number(product.productQuantity) + Number(existingProduct.productQuantity);
                product.productQuantity = newProductQuantity.toString();
                
                return this.updateCartProduct(existingProduct._id, product);
            }else{
                const newCartProduct = new CartProductsModel(product);
                await newCartProduct.save();
                return DBMongoDB.getObjectWithId(newCartProduct.toObject());
            }
        } catch (error) {
            console.error(`Error al intentar dar de alta el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readCartProducts() {
        if (! await DBMongoDB.connectDB()) {
            return [];
        }
        try {
            const products = await CartProductsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(products);
        } catch (error) {
            console.error(`Error al intentar obtener los productos: ${error.message}`);
            return [];
        }
    }

    async readCartProductByProductId(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const product = await CartProductsModel.findOne({productId: id}).lean();
            return product;

        } catch (error) {
            console.error(`Error al intentar obtener el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateCartProduct(id, product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const updatedProduct = await CartProductsModel.findByIdAndUpdate(id, {$set: product}, {
                returnDocument: 'after'
            }).lean();
            return DBMongoDB.getObjectWithId(updatedProduct);
        } catch (error) {
            console.error(`Error al intentar actualizar el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteCartProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const deletedProduct = await CartProductsModel.deleteOne({productId: id}).lean();
            return DBMongoDB.getObjectWithId(deletedProduct);
        } catch (error) {
            console.error(`Error al intentar eliminar el producto: ${error.message}`);
            return {};
        }
    }

    async deleteCartProducts() {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const deletedProducts = await CartProductsModel.deleteMany({});
            return DBMongoDB.getObjectWithId(deletedProducts);
        } catch (error) {
            console.error(`Error al intentar eliminar todos los productos: ${error.message}`);
            return {};
        }
    }
}

export default CartModelMongoDB;
