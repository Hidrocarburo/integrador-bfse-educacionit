import mongoose from "mongoose";
import DBMongoDB from "./DBMongoDB.js";

// Esquema del documento Cart
const cartProductSchema = mongoose.Schema({
    products: Array
});

// Modelo del documento almacenado en una colección
const orderModel = mongoose.model('orders', cartProductSchema);

class orderModelMongoDB {

    // CRUD - C: CREATE
    async createOrder(products) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }

        try {
            const newOrder = new orderModel(products);
            await newOrder.save();

            console.log(`New order generated: ${newOrder}`);
            return DBMongoDB.getObjectWithId(newOrder.toObject());
        } catch (error) {
            console.error(`Error al intentar dar de alta el producto: ${error.message}`);
            return {};
        }
    }
}

export default orderModelMongoDB;
