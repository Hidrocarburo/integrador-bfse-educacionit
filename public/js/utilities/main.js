
///////////////////////////////////////////////////////////
//                                                       //
//                          SPA                          //
//                                                       //
///////////////////////////////////////////////////////////

const main = document.querySelector('main');
const mainNav = document.querySelector('.main-nav__list');

const cachePages = {};
const cachePagesScripts = {};
const cacheScriptsLoaded = {};

const runScript = (content) => {
    const script = document.createElement('script');
    script.innerHTML = content;
    document.body.appendChild(script);
    return true;
};

const scriptRegex = new RegExp(/(?<=<script {0,}src=["']).+\.js(?=["'] {0,}> {0,}<\/script>)/g);
const getAsyncRequest = async (URL, element) => {
    if (cachePages[URL] === undefined) {
        try{
            const template = await fetch(URL);

            if (!template.ok){
                throw new Error('Template no encontrado')
            }

            cachePages[URL] = template.ok ? await template.text() : null;
        }catch(error){
            hashRefreshPage('#inicio');
        }
    }

    if (cachePages[URL]){
        const scripts = cachePages[URL].match(scriptRegex);
        element.innerHTML = cachePages[URL];

        if (!cachePagesScripts[URL]){
            
            if (scripts !== null){
                scripts.forEach(async element => {
                    if (cacheScriptsLoaded[element]){
                        return
                    }else{
                        cacheScriptsLoaded[element] = true;
                    }
                    const script = await (await fetch(element)).text();

                    const response = runScript(await script);
                    
                    cachePagesScripts[URL] = response;
                });
            }else{
                cachePagesScripts[URL] = true;
            }
            cachePages[URL] = element.innerHTML;
        }

        try{
            switch(URL){
                case 'views/alta.html': 
                case 'views/contacto.html':
                    loadForms(); 
                    break;
                case 'views/inicio.html':
                    loadProductsToHTML();
                    break;
            }
        }catch (error){

        }
    }
};

const hashRefreshPage = (hash) => {
    if (hash !== ''){
        const routeName = hash.split('#')[1];
        const templateURL = `views/${routeName}.html`;
        for (link of mainNav.children){
            link.children[0].classList.toggle('main-nav__link--active', link.children[0].getAttribute('href') === `${routeName}.html`);
        };
        getAsyncRequest(templateURL, main);
    }else{
        getAsyncRequest('views/inicio.html', main);
    }
}

const routeRegex = new RegExp('(?<=\/)[^\/]+(?=\.html)');

mainNav.addEventListener('click', e => {
    if (e.target.classList.contains('main-nav__link')){
        e.preventDefault();
        const routeName = `${e.target.href.match(routeRegex)[0]}`;
        location.hash = routeName;
    }
    
});

window.addEventListener('hashchange', e => {
    hashRefreshPage(e.target.location.hash);
});

window.addEventListener('load', e => {
    hashRefreshPage(e.target.location.hash);
})


///////////////////////////////////////////////////////////
//                                                       //
//                        Carrito                        //
//                                                       //
///////////////////////////////////////////////////////////

const cartModalLink = document.querySelector('#cartModalLink')
const cartModal = document.querySelector('#cartModal');
const cartProductsContainer = document.querySelector('.cart-modal__products-container')

cartModalLink.addEventListener('click', e=>{
    e.preventDefault();
    cartModal.classList.toggle('cart-modal--hidden');
});

cartModal.addEventListener('click', e=>{
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
        updateCartProductQuantity(productCard, true);
    }

    if (e.target.classList.contains('cart-modal__product-quantity-remove-button') ||
        !!e.target.closest('.cart-modal__product-quantity-remove-button'))
    {
        const productCard = e.target.closest('.cart-modal__product');
        updateCartProductQuantity(productCard, false);
    }

    if (e.target.classList.contains('cart-modal__product-remove-button') ||
        !!e.target.closest('.cart-modal__product-remove-button'))
    {
        const productCard = e.target.closest('.cart-modal__product');
        removeCartProduct(productCard);
    }
});

document.addEventListener('keydown', e=>{
    if (e.code === 'Escape' && !cartModal.classList.contains('cart-modal--hidden')){
        cartModal.classList.toggle('cart-modal--hidden', true);
        return;
    }
});

const updateCartProductQuantity = (productCard, add) => {

    const productId = productCard.id;

    const productQuantity = productCard.querySelector('.cart-modal__product-quantity-text');
    const productQuantityInt = parseInt(productQuantity.innerHTML) + (add ? 1 : -1);
    if (productQuantityInt <= 0){
        removeCartProduct(productCard);
        return;
    }
    productQuantity.innerHTML = productQuantityInt;

    const productPrice = productCard.querySelector('.cart-modal__product-quantity-price-text');
    const cartProductCard = productsJson.products.find(element => element.id === productId);
    const singleProductPrice = parseInt(cartProductCard.price);
    productPrice.innerHTML = singleProductPrice * productQuantityInt;
    updateCartTotals();
}

const removeCartProduct = (productCard) => {
    productCard.remove();
    updateCartTotals();
}

const updateCartTotals = () => {
    const productsQuantity = cartProductsContainer.querySelectorAll('.cart-modal__product-quantity-text');
    let quantityTotal = 0;
    for (quantity of productsQuantity){
        quantityTotal += parseInt(quantity.innerHTML);
    }
    const quantityTotalElement = cartModal.querySelector('.cart-modal__total-products-value');
    quantityTotalElement.innerHTML = quantityTotal;

    const productsPrice = cartProductsContainer.querySelectorAll('.cart-modal__product-quantity-price-text');
    let priceTotal = 0;
    for (price of productsPrice){
        priceTotal += parseInt(price.innerHTML);
    }

    const priceTotalElement = cartModal.querySelector('.cart-modal__total-price-value');
    priceTotalElement.innerHTML = priceTotal;
}

////////////////////////////////////////////////////////////
//                                                        //
//                         Toasts                         //
//                                                        //
////////////////////////////////////////////////////////////

const toastsContainer = document.querySelector('.confirmation-toast');
const showToast = (message)=>{
    let toast = `
    <div class="confirmation-toast__item">
        <h2 class="confirmation-toast__title">{{title}}</h2>
        <p class="confirmation-toast__body">{{description}}</p>
        <div class="confirmation-toast__close-button">
            <img class="confirmation-toast__close-button-img" src="/img/icons/xmark-solid.svg" alt="Cerrar">
        </div>
    </div>
    `

    const template = Handlebars.compile(toast);
    const toastElement = template(message); 

    toast = toastsContainer.querySelector('.confirmation-toast__item');
    if (toast !== null){
        toast.remove();
    };

    toastsContainer.insertAdjacentHTML('beforeend', toastElement)

    toast = toastsContainer.querySelector('.confirmation-toast__item')

    toast.addEventListener('click', e => {
        if (e.target.classList.contains('.confirmation-toast__item')){
            e.target.remove();
        }else{
            e.target.closest('.confirmation-toast__item').remove();
        }
    });
    setTimeout(()=>{
        toast.style.opacity = 0;
        setTimeout(()=>{
            toast.remove();
        }, 1000)
    }, 2000)
}