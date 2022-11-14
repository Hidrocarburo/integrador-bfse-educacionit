import cartService from '/js/services/cart.js';

class cartController {

    async getCartProducts() {
        const products = await cartService.getCartProducts();
        return products;
    }
    
    async saveCartProduct(product) {
        const savedProduct = await cartService.saveCartProduct(product);
        return savedProduct;
    }

    async updateCartProduct(id, product) {
        const updatedProduct = await cartService.updateCartProduct(id, product);
        return updatedProduct;
    }

    async deleteCartProduct(id) {
        const deletedProduct = await cartService.deleteCartProduct(id);
        return deletedProduct;
    }

    async deleteAllCartProducts() {
        const deletedProducts = await cartService.deleteAllCartProducts();
        return deletedProducts;
    }
}

const productController = new cartController();
export default productController;
