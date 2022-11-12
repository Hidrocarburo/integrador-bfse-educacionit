import productController from '/js/controllers/product.js';

class PageInicio{
    static handlebarsTemplate = ''
    static products = '';

    static async ajax(url, responseType = 'text', method = 'get') {
        return await fetch(url, { method: method }).then(r => r[responseType]());
    }
    
    static async getHbsTemplate (URL) {
        try {
            const pseudoHTML = await PageInicio.ajax(URL);
            return pseudoHTML
        } catch(error) {
            console.error('getHbsTemplate() exception: error while trying to get hbs template: ', error);
            return '';
        }
    }

    static async init () {

        PageInicio.products = await productController.getProducts();

        const pseudoHTML = await PageInicio.getHbsTemplate('templates/product-cards.hbs');
        PageInicio.handlebarsTemplate = Handlebars.compile(pseudoHTML);

        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = PageInicio.handlebarsTemplate({ products: PageInicio.products });
    
        // bindAddToCartEvent(cardsContainer);
    }
}

export default PageInicio;
