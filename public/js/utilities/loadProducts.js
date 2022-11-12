

////////////////////////////////////////////////////////////
//                                                        //
//                Lógica añadir al carrito                //
//                                                        //
////////////////////////////////////////////////////////////

const bindAddToCartEvent = (cardsContainer) => {
    cardsContainer.addEventListener('click', async e => {
        if (e.target.classList.contains('card__link') ||
            !!e.target.closest('.card__link'))
        {
            e.preventDefault();
            const productId = e.target.closest('.card').id;
            let productCard = cartProductsContainer.querySelector(`#${productId}`);

            if (productCard === null){
                const pseudoHTML = await getHbsTemplate('/templates/modalCartProduct.hbs');
                const template = Handlebars.compile(pseudoHTML);
                // productCard = template(productsJson.products[productId]);
                productCard = template(productsJson.products.find(element => element.id === productId));
                cartProductsContainer.insertAdjacentHTML('beforeend', productCard);
                updateCartTotals();
                showToast({
                    title: 'Producto agregado al carrito',
                    description: '¡El producto se agregó al carrito correctamente!'
                });
            } else {
                updateCartProductQuantity(productCard, true);
                showToast({
                    title: 'Producto agregado al carrito',
                    description: '¡El producto se agregó al carrito correctamente!'
                });
            }
        }
    });
}

loadProductsToHTML();

