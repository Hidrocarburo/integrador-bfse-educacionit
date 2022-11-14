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
        const formData  = new FormData();

        for(const name in product) {
            formData.append(name, product[name]);
        }

        const savedProduct = await http.post(this.URL_PRODUCTS, product, formData, 'formData');
        return savedProduct;
    }

    async updateProduct(id, product) {
        const formData  = new FormData();

        for(const name in product) {
            formData.append(name, product[name]);
        }

        const updatedProduct = await http.put(this.URL_PRODUCTS, id, product, formData, 'formData');
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await http.delete(this.URL_PRODUCTS, id);
        return deletedProduct;
    }
}

const productService = new ProductService();

export default productService;
