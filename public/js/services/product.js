import http from '/js/clients/http.client.js';

class ProductService {
    
    URL_PRODUCTS = '/api/products/'

    async getProduct(id) {
        const product = await http.get(this.URL_PRODUCTS, id);
        return product;
    }

    async getProducts() {
        const products = await http.get(this.URL_PRODUCTS);
        return products;
    }

    async saveProduct(product) {
        console.log('servicio:', product);
        const savedProduct = await http.post(this.URL_PRODUCTS, product);
        return savedProduct;
    }

    async updateProduct(id, product) {
        const updatedProduct = await http.put(this.URL_PRODUCTS, id, product);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await http.delete(this.URL_PRODUCTS, id);
        return deletedProduct;
    }
}

const productService = new ProductService();

export default productService;
