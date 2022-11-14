import http from '/js/clients/http.client.js';

class ProductService {
    
    URL_CART = '/api/cart/'

    async getCartProducts() {
        const products = await http.get(this.URL_CART);
        return products;
    }

    async saveCartProduct(product) {
        const savedProduct = await http.post(this.URL_CART, product);
        return savedProduct;
    }

    async updateCartProduct(id, product) {
        const updatedProduct = await http.put(this.URL_CART, id, product);
        return updatedProduct;
    }

    async deleteCartProduct(id) {
        const deletedProduct = await http.delete(this.URL_CART, id);
        return deletedProduct;
    }

    async deleteAllCartProducts() {
        const deletedProducts = await http.delete(this.URL_CART);
        return deletedProducts;
    }
}

const productService = new ProductService();

export default productService;
