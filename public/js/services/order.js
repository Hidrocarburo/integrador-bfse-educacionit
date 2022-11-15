import http from '/js/clients/http.client.js';

class OrderService {
    
    URL_ORDER = '/api/order/'

    async createOrder(products) {
        const newOrder = await http.post(this.URL_ORDER, products);
        return newOrder;
    }
}

const orderService = new OrderService();

export default orderService;
