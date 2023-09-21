const config = {
    PORT: 8080,
    MONGODB_CONNECTION_STR: '',
    MONGODB_TIMEOUT: 5000,
    PRODUCT_IMAGES_FOLDER: './public/products', // Debe estar dentro de public.
    URL_PRODUCT_API: '/api/products',
    URL_CART_API: '/api/cart',
    URL_ORDER_API: '/api/order'
};

export {config as default};
