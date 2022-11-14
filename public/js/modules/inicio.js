import productController from '/js/controllers/product.js';
import cartController from '/js/controllers/cart.js';
import Requests from '/js/utilities/requests.js';
import Toast from "/js/utilities/toasts.js";
import Cart from '/js/utilities/cart.js';

class PageInicio{
    static handlebarsTemplate = ''
    static products = '';

    static bindAddToCartEvent = async (cardsContainer) => {
        cardsContainer.addEventListener('click', async e => {
            if (e.target.classList.contains('card__link') ||
                !!e.target.closest('.card__link'))
            {
                e.preventDefault();
                const product = e.target.closest('.card');

                await cartController.saveCartProduct({productId: product.id, productQuantity: '1'});

                Cart.loadCart();
                Toast.showToast({
                    title: 'Producto agregado al carrito',
                    description: '¡El producto se agregó al carrito correctamente!'
                });
            }
        });
    }

    static async init () {

        PageInicio.products = await productController.getProducts();

        const pseudoHTML = await Requests.getHbsTemplate('templates/product-cards.hbs');
        PageInicio.handlebarsTemplate = Handlebars.compile(pseudoHTML);

        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = PageInicio.handlebarsTemplate({ products: PageInicio.products });

        await PageInicio.bindAddToCartEvent(cardsContainer);
    }
}

export default PageInicio;
