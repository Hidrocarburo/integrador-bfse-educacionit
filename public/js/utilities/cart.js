import cartController from '/js/controllers/cart.js';
import productController from '/js/controllers/product.js';
import orderController from '/js/controllers/order.js';
import Requests from '/js/utilities/requests.js';

class Cart {
    static async getProductsByCards () {
        const cartProductList = await cartController.getCartProducts();
        const productList = [];

        for (let element of cartProductList){
            const product = await productController.getProduct(element.productId);

            Object.keys(product).length > 0 ? productList.push({product, productQuantity: element.productQuantity}) : '' ;
        }

        return productList;
    }

    static async bindCartEvents () {
        const cartModalLink = document.querySelector('#cartModalLink')
        const cartModal = document.querySelector('#cartModal');
    
        cartModalLink.addEventListener('click', e=>{
            e.preventDefault();
            cartModal.classList.toggle('cart-modal--hidden');
        });
    
        cartModal.addEventListener('click', async e=>{
            if (e.target.id === 'cartModal' || 
                e.target.classList.contains('cart-modal__close-button-img'))
            {
                cartModal.classList.toggle('cart-modal--hidden', true);
                return;
            }
    
            if (e.target.classList.contains('cart-modal__product-quantity-add-button') ||
                !!e.target.closest('.cart-modal__product-quantity-add-button'))
            {
                const productCard = e.target.closest('.cart-modal__product');
                Cart.updateCartProductQuantity(productCard, true);
            }
    
            if (e.target.classList.contains('cart-modal__product-quantity-remove-button') ||
                !!e.target.closest('.cart-modal__product-quantity-remove-button'))
            {
                const productCard = e.target.closest('.cart-modal__product');
                Cart.updateCartProductQuantity(productCard, false);
            }
    
            if (e.target.classList.contains('cart-modal__product-remove-button') ||
                !!e.target.closest('.cart-modal__product-remove-button'))
            {
                const productCard = e.target.closest('.cart-modal__product');
                Cart.removeCartProduct(productCard);
            }

            if (e.target.classList.contains('cart-modal__total-buy-button')){

                const productList = {};
                productList.products = await Cart.getProductsByCards();

                if (productList.products.length < 1){
                    console.warn('Carrito vacío');
                    return;
                }
                const newOrder = await orderController.createOrder(productList);
                await cartController.deleteAllCartProducts();

                await Cart.loadCart();
                
                console.warn('Orden generada');
                console.warn(newOrder);
            }
        });
    
        document.addEventListener('keydown', e=>{
            if (e.code === 'Escape' && !cartModal.classList.contains('cart-modal--hidden')){
                cartModal.classList.toggle('cart-modal--hidden', true);
                return;
            }
        });
    }

    static async loadCart() {
        const productList = await Cart.getProductsByCards();

        const pseudoHTML = await Requests.getHbsTemplate('/templates/cart-products.hbs');
        const template = Handlebars.compile(pseudoHTML);
        const cartProductsHTML = template({productList});

        const cartProductsContainer = document.querySelector('.cart-modal__products-container');
        cartProductsContainer.innerHTML = cartProductsHTML;

        Cart.updateCartTotals(cartProductsContainer);
    }
    
    static updateCartProductQuantity = async (productCard, isAdding) => {
        const productId = productCard.id;
        const updatedProduct = await cartController.saveCartProduct({productId, productQuantity: (isAdding ? 1 : -1)});

        if (updatedProduct.productQuantity <= 0){
            await cartController.deleteCartProduct(updatedProduct.productId);
        }

        await Cart.loadCart();
    }

    static removeCartProduct = async (productCard) => {
        const productId = productCard.id;
        await cartController.deleteCartProduct(productId);
        await Cart.loadCart();
    }

    static updateCartTotals = (cartProductsContainer) => {
        const productsQuantity = cartProductsContainer.querySelectorAll('.cart-modal__product-quantity-text');

        let quantityTotal = 0;
        for (let quantityElement of productsQuantity){
            quantityTotal += parseInt(quantityElement.innerHTML);

            const totalProductPriceElement = quantityElement.closest('.cart-modal__product').querySelector('.cart-modal__product-quantity-price-text');
            totalProductPriceElement.innerHTML = parseInt(totalProductPriceElement.innerHTML) * quantityElement.innerHTML;
        }

        const quantityTotalElement = cartModal.querySelector('.cart-modal__total-products-value');
        quantityTotalElement.innerHTML = quantityTotal;

        const productsPrice = cartProductsContainer.querySelectorAll('.cart-modal__product-quantity-price-text');
        let totalPrice = 0;
        for (let price of productsPrice){
            totalPrice += parseInt(price.innerHTML);
        }
        const totalPriceElement = cartModal.querySelector('.cart-modal__total-price-value');
        totalPriceElement.innerHTML = totalPrice;
    }
}

export default Cart
