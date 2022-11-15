import http from '/js/clients/http.client.js';

class CartService {
    
    URL_CART = '/api/cart/'

    async getCartProducts() {
        const products = await http.get(this.URL_CART);
        return products;
    }

    async saveCartProduct(product) {
        const savedCartProduct = await http.post(this.URL_CART, product);
        return savedCartProduct;
    }

    async updateCartProduct(id, product) {
        const updatedCartProduct = await http.put(this.URL_CART, id, product);
        return updatedCartProduct;
    }

    async deleteCartProduct(id) {
        const deletedCartProduct = await http.delete(this.URL_CART, id);
        return deletedCartProduct;
    }

    async deleteAllCartProducts() {
        const deletedCartProducts = await http.delete(this.URL_CART);
        return deletedCartProducts;
    }
}

const cartService = new CartService();

export default cartService;
