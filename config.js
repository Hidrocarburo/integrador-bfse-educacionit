const config = {
    PORT: 8080,
    MONGODB_CONNECTION_STR: 'mongodb+srv://Hidrocarburo:1234qwer@cluster0.z6qan3p.mongodb.net/ecommerce?retryWrites=true&w=majority',
    MONGODB_TIMEOUT: 5000,
    PRODUCT_IMAGES_FOLDER: './public/products', // Debe estar dentro de public.
    URL_PRODUCT_API: '/api/products',
    URL_CART_API: '/api/cart'
};

export {config as default};