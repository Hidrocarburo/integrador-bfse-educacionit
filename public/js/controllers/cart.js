import cartService from '/js/services/cart.js';

class CartController {

    async getCartProducts() {
        const products = await cartService.getCartProducts();
        return products;
    }
    
    async saveCartProduct(product) {
        const savedCartProduct = await cartService.saveCartProduct(product);
        return savedCartProduct;
    }

    async updateCartProduct(id, product) {
        const updatedCartProduct = await cartService.updateCartProduct(id, product);
        return updatedCartProduct;
    }

    async deleteCartProduct(id) {
        const deletedCartProduct = await cartService.deleteCartProduct(id);
        return deletedCartProduct;
    }

    async deleteAllCartProducts() {
        const deletedCartProducts = await cartService.deleteAllCartProducts();
        return deletedCartProducts;
    }
}

const cartController = new CartController();
export default cartController;
