import orderService from '/js/services/order.js';

class OrderController {
    
    async createOrder(products) {
        const newOrder = await orderService.createOrder(products);
        return newOrder;
    }
}

const orderController = new OrderController();
export default orderController;
