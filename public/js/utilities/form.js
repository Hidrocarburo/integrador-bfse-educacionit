class Form {
    static validations = {
        productName: {
            required: true,
            validate: value=>{
                const regex = new RegExp('^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñüÜ \'",./\-_¿?¡!]+$');
    
                if(value.length < 1){
                    return 'El nombre no puede estar vacío.'
                }
                if(value.length > 30){
                    return 'El nombre debe contener hasta 30 caracteres como máximo'
                }
                if(!regex.test(value)){
                    return 'El formato del nombre es inválido.'
                }
                return true;
            }
        },
        productImg: {
            required: true,
            validate: value=>{
                const regex = new RegExp('^image');
                
                if (value == ''){
                    return 'La foto del producto es obligatoria';
                }
                if (!regex.test(value)){
                    return 'El archivo subido no es una foto';
                }
                return true;
            }
        },
        productBrand: {
            required: true,
            validate: value=>{
                const regex = new RegExp('^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñüÜ \'",./\-_¿?¡!]+$');
    
                if(value.length < 1){
                    return 'La marca no puede estar vacía.'
                }
                if(value.length > 40){
                    return 'La marca debe contener hasta 40 caracteres como máximo'
                }
                if(!regex.test(value)){
                    return 'El formato de la marca es inválido.'
                }
                return true;
            }
        },
        productCategory: {
            required: true,
            validate: value=>{
                const regex = new RegExp('^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñüÜ \'",./\-_¿?¡!]+$');
    
                if(value.length < 1){
                    return 'La categoría no puede estar vacía.'
                }
                if(value.length > 50){
                    return 'La categoría debe contener hasta 50 caracteres como máximo'
                }
                if(!regex.test(value)){
                    return 'El formato de la categoría es inválido.'
                }
                return true;
            }
        },
        productShortDesc: {
            required: true,
            validate: value=>{
                if(value.length < 1){
                    return 'La descripción no puede estar vacía.'
                }
    
                if(value.length > 80){
                    return 'La descripción corta debe contener hasta 80 caracteres como máximo.'
                }
                return true;
            }
        },
        productLongDesc: {
            required: true,
            validate: value=>{
                if(value.length < 1){
                    return 'La descripción no puede estar vacía.'
                }
    
                if(value.length > 2000){
                    return 'La descripción larga debe contener hasta 2000 caracteres como máximo.'
                }
                return true;
            }
        },
        productMinAge: {
            required: true,
            auxValue: 0,
            validate: value=>{
                if (value < 0){
                    return 'La edad mínima no puede ser menor a uno'
                }
    
                Form.validations.productMinAge.auxValue = value;
                return true;
            }
        },
        productMaxAge: {
            required: true,
            validate: value=>{
    
                if (value < 0){
                    return 'La edad máxima no puede ser menor a uno'
                }
    
                const minAge = Form.validations.productMinAge.auxValue;
                const maxAge = value;
                const result = maxAge - minAge;
                
                if (result < 0){
                    return 'La edad máxima no puede ser menor a la edad mínima.'
                }
                return true;
            }
        },
        productPrice: {
            required: true,
            validate: value=>{
                if (value <= 0){
                    return 'El precio del producto no puede ser cero o negativo.'
                }
                return true;
            }
        },
        productStock: {
            required: true,
            validate: value=>{
                if (value < 1){
                    return 'El stock del producto no puede ser menor a uno'
                }
                return true;
            }
        },
        customerName: {
            required: true,
            validate: value=>{
                if(value.length < 1){
                    return 'Debes ingresar un nombre'
                }
                return true;
            }
        },
        customerEmail: {
            required: true,
            validate: value=>{
                const regex = new RegExp(/\w@\w+\w*\.[a-z\.]+$/g);
    
                if(value.length < 1){
                    return 'Debes ingresar un e-mail.'
                }
                if(!regex.test(value)){
                    return 'El e-mail no es válido.'
                }
                return true;
            }
        },
        customerMessage: {
            required: true,
            validate: value=>{
                const regex = new RegExp('.{10,}');
    
                if(value.length < 1){
                    return 'Debes ingresar un comentario.'
                }
    
                if(!regex.test(value)){
                    return 'El comentario debe tener un mínimo de 10 caracteres de largo.'
                }
                return true;
            }
        }
    }
    
    static validate = (element) => {
        let value = element.value;
    
        if (element.id === 'productImg' &&
            element.files.length > 0)
        {
            value = element.files[0].type;
        }
    
        if (element.id === 'productMaxAge' ||
            element.id === 'productMinAge')
        {
            let valueModifier = '';
            
            if (element.id === 'productMaxAge'){
                valueModifier = element.parentNode.querySelector('#productMaxAgeVariant');
            } else {
                valueModifier = element.parentNode.querySelector('#productMinAgeVariant');
            }
            
            if (element.value < 1){
                value = -1
            } else {
                value = element.value / parseInt(valueModifier.value);
            }
        }
    
        const elementName = element.id;
    
        if(Form.validations[elementName]){
            if(Form.validations[elementName].required){
                return Form.validations[elementName].validate(value);
            }else{
                if (value.length < 1){
                    return true;
                }else{
                    return Form.validations[elementName].validate(value);
                }
            }
        }else{
            return true;
        }
    }
    
    static styleInput = (element, status)=>{
        const container = element.parentNode;
    
        if(status !== true){
            const response = Form.validate(element) || `Ha ocurrido un error validando ${element.id}`
    
            if(element.getAttribute('type') === 'text' ||
                element.getAttribute('type') === 'number')
            {
                element.classList.toggle('form__input--error', true);
                container.querySelector('.form__label').classList.toggle('form__label--error', true);
                container.querySelector('.form__error-item').innerHTML = response;
                return;
            }
            if(element.getAttribute('type') === 'file'){
                container.querySelector('.form__file-label').classList.toggle('form__file-label--error', true);
                container.querySelector('.form__error-item').innerHTML = response;
                return;
            }
            if(element.tagName === 'SELECT'){
                element.classList.toggle('form__select--error', true);
                container.querySelector('.form__error-item').innerHTML = response;
                return;
            }
            if(element.tagName === 'TEXTAREA'){
                element.classList.toggle('form__textarea--error', true);
                container.querySelector('.form__textarea-label').classList.toggle('form__textarea-label--error', true);
                container.querySelector('.form__error-item').innerHTML = response;
                return;
            }
        }else{
            if(element.getAttribute('type') === 'text' ||
                element.getAttribute('type') === 'number')
            {
                element.classList.toggle('form__input--error', false);
                container.querySelector('.form__label').classList.toggle('form__label--error', false);
                container.querySelector('.form__error-item').innerHTML = '';
                return;
            }
            if(element.getAttribute('type') === 'file'){
                container.querySelector('.form__file-label').classList.toggle('form__file-label--error', false);
                container.querySelector('.form__error-item').innerHTML = '';
                return;
            }
            if(element.tagName === 'SELECT' && !element.classList.contains('form__input-variant-select')){
                element.classList.toggle('form__select--error', false);
                container.querySelector('.form__error-item').innerHTML = '';
                return;
            }
            if(element.tagName === 'TEXTAREA'){
                element.classList.toggle('form__textarea--error', false);
                container.querySelector('.form__textarea-label').classList.toggle('form__textarea-label--error', false);
                container.querySelector('.form__error-item').innerHTML = '';
                return;
            }
        }
    }
    
    static displayErrors = (form, errors = '')=>{
        const errorListContainer = form.querySelector('.form__error-list-container');
        const errorList = errorListContainer.querySelector('.form__error-list');
        errorList.innerHTML = '';
    
        if(errors.length > 0){
            errorListContainer.classList.toggle('form__error-list-container--hidden', false);
            for (let error of errors){
                const li = document.createElement('li');
                li.innerHTML = error;
                errorList.appendChild(li);
            }
        }else{
            errorListContainer.classList.toggle('form__error-list-container--hidden', true);
        }
    }

    static submitEvent = async () => {
        console.log('Submit event not defined.');
    }
    
    static loadForms = async () => {
        const forms = document.getElementsByClassName('form');
    
        for(let formContainer of forms){
            let form = formContainer.querySelector('.form__form');
            
            form.addEventListener('input', e=>{
                if (e.target.getAttribute('type') === 'text' ||
                    e.target.getAttribute('type') === 'number' ||
                    e.target.tagName === 'SELECT' ||
                    e.target.tagName === 'TEXTAREA')
                {
                    const response = Form.validate(e.target) || `Ha ocurrido un error validando ${e.target.id}`;
                    Form.styleInput(e.target, response);
                    Form.displayErrors(form)
                };
            });
        
            form.addEventListener('submit', async (e)=>{
                e.preventDefault();
                let hasErrors = false;
                const errorList = [];
                const formElements = form.elements;
        
                for(let element of formElements){
                    
                    if (element.getAttribute('type') !== 'submit'){
                        const response = Form.validate(element) || `Ha ocurrido un error validando ${element.id}`;
        
                        Form.styleInput(element, response);
                        
                        if(response !== true){
                            hasErrors = true;
                            errorList.push(response);
                        }
                    }
                };
        
                if (hasErrors){
                    Form.displayErrors(form, errorList)
                }else{
                    await Form.submitEvent.then(r => r());
                }
            })
        }
    }
}

export default Form