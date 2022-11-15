import productController from '/js/controllers/product.js';
import formUtil from '../utilities/form.js'

class PageAlta {

    static async submitAction() {
        return async function () {
            const productToSave = {};

            for (const field of PageAlta.fields) {
                if(field.name === 'productImg'){
                    productToSave[field.name] = field.files[0];
                }else{
                    productToSave[field.name] = field.value;
                }
            }

            await PageAlta.saveProduct(productToSave);
            PageAlta.emptyForm();

            return
        }
    }

    static async updateAction() {
        return async function () {
            const productToSave = {};

            for (const field of PageAlta.fields) {
                if(field.name === 'productImg'){
                    productToSave[field.name] = field.files[0];
                }else{
                    productToSave[field.name] = field.value;
                }
            }

            await PageAlta.updateProduct(productToSave);
            PageAlta.emptyForm();

            PageAlta.disableButton(PageAlta.btnCreate, false)
            PageAlta.disableButton(PageAlta.btnUpdate, true)
            PageAlta.disableButton(PageAlta.btnCancel, true)

            formUtil.submitEvent = PageAlta.submitAction()

            return
        }
    }

    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();

        PageAlta.renderTemplateTable(products);
        return savedProduct;
    }

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();

        PageAlta.renderTemplateTable(products);
        return updatedProduct;
    }

    static disableButton(button, state){
        button.disabled = state;
        button.classList.toggle('form__submit-btn--disabled', state);
    }

    static emptyForm() {
        PageAlta.fields.forEach(field => {
            if(field.name === 'productImg'){
                delete field.files;
            }else{
                field.value = ''
            }
        });

        
    }

    static async addCancelEvent() {

        PageAlta.btnCancel.addEventListener('click', e => {

            PageAlta.emptyForm();
            PageAlta.disableButton(PageAlta.btnCreate, false)
            PageAlta.disableButton(PageAlta.btnUpdate, true)
            PageAlta.disableButton(PageAlta.btnCancel, true)
            formUtil.submitEvent = PageAlta.submitAction()
        });
    }

    static completeForm(product) {
        PageAlta.fields.forEach(field => {

            if(field.name === 'productImg'){
                PageAlta.form.querySelector('.form__file-text').innerHTML = 'Seleccionar imagen';
                return;
            }

            if(field.type === 'submit'){
                return;
            }

            field.value = product[field.name];

        });
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.products-table-container').innerHTML = html;
    }

    static async addTableEvents() {
        const deleteProduct = async (e) => {
            if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
                return;
            }
            const row = e.target.closest('tr');
            const id = row.dataset.id;
            const deletedProduct = await productController.deleteProduct(id);

            const products = await productController.getProducts();
            PageAlta.renderTemplateTable(products);
        };

        const editProduct = async e => {
            const row = e.target.closest('tr');

            const productId = row.dataset.id;
            const product = await productController.getProduct(productId)

            PageAlta.completeForm(product);

            PageAlta.disableButton(PageAlta.btnCreate, true)
            PageAlta.disableButton(PageAlta.btnUpdate, false)
            PageAlta.disableButton(PageAlta.btnCancel, false)

            scrollTo(0,0);
            formUtil.submitEvent = PageAlta.updateAction()
        };

        document.querySelector('.products-table-container').addEventListener('click', e => {
            if (e.target.classList.contains('products-table__btn--delete') ||
            !!e.target.closest('.products-table__btn--delete')) {
                deleteProduct(e);
                return;
            }
            if (e.target.classList.contains('products-table__btn--edit') ||
            !!e.target.closest('.products-table__btn--edit')) {
                editProduct(e);
                return;
            }
        });
    }

    static async init () {

        formUtil.loadForms();
        formUtil.submitEvent = PageAlta.submitAction()

        PageAlta.form = document.getElementById('createProductForm');
        PageAlta.fields = PageAlta.form.querySelectorAll('input, textarea');
        PageAlta.btnCreate = PageAlta.form.querySelector('#btnSubmit');
        PageAlta.btnUpdate = PageAlta.form.querySelector('#btnUpdate');
        PageAlta.btnCancel = PageAlta.form.querySelector('#btnCancel');

        PageAlta.addCancelEvent();

        const products = await productController.getProducts();
        await PageAlta.renderTemplateTable(products);

        PageAlta.addTableEvents();
    }
}

export default PageAlta;
