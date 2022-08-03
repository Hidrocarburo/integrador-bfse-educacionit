const forms = document.getElementsByClassName('form');
const validations = {
    productName: {
        required: true,
        validate: value=>{
            const regex = new RegExp('.{2,}');

            if(value.length < 1){
                return 'El nombre del producto no puede estar vacío.'
            }
            if(!regex.test(value)){
                return 'El nombre del producto debe tener un mínimo de 2 caracteres de largo.'
            }
            return true;
        }
    },
    productBrand: {
        required: false,
        validate: value=>{
            const regex = new RegExp('.{2,}');

            if(!regex.test(value)){
                return 'La marca del producto debe tener un mínimo de 2 caracteres de largo.'
            }
            return true;
        }
    },
    productCategory: {
        required: true,
        validate: value=>{
            if (value === ''){
                return 'Debe seleccionar una categoría para el producto.'
            }
            return true;
        }
    },
    productMinAge: {
        required: false,
        auxValue: 0,
        validate: (value)=>{
            validations.productMinAge.auxValue = value;
            console.log(validations.productMinAge.auxValue);
            return true;
        }
    },
    productMaxAge: {
        required: false,
        validate: value=>{
            const minAge = validations.productMinAge.auxValue;
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
            if (value < 1){
                return 'Debe especificar el precio del producto.'
            }
            if (value < 10){
                return 'El precio del producto no puede ser menor a $10'
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

const validate = element=>{
    const value = element.value
    const elementName = element.id;

    if(validations[elementName]){
        if(validations[elementName].required){
            return response = validations[elementName].validate(value);
        }else{
            if (value.length < 1){
                return true;
            }else{
                console.log(elementName);
                return response = validations[elementName].validate(value);
            }
        }
    }else{
        return true;
    }
}

const styleInput = (element, status)=>{
    const container = element.parentNode;
    console.log({element, container});

    if(status !== true){
        if(element.tagName === 'INPUT'){
            element.classList.toggle('form__input--error', true);
            container.querySelector('.form__label').classList.toggle('form__label--error', true);
            return;
        }
        if(element.tagName === 'SELECT'){
            element.classList.toggle('form__select--error', true);
            return;
        }
        if(element.tagName === 'TEXTAREA'){
            element.classList.toggle('form__textarea--error', true);
            container.querySelector('.form__textarea-label').classList.toggle('form__textarea-label--error', true);
            return;
        }
    }else{
        if(element.getAttribute('type') === 'text' ||
            element.getAttribute('type') === 'number')
        {
            element.classList.toggle('form__input--error', false);
            container.querySelector('.form__label').classList.toggle('form__label--error', false);
            return;
        }
        if(element.tagName === 'SELECT'){
            element.classList.toggle('form__select--error', false);
            return;
        }
        if(element.tagName === 'TEXTAREA'){
            element.classList.toggle('form__textarea--error', false);
            container.querySelector('.form__textarea-label').classList.toggle('form__textarea-label--error', false);
            return;
        }
    }
}

const displayErrors = (form, errors = '')=>{
    const errorListContainer = form.querySelector('.form__error-list-container');
    const errorList = errorListContainer.querySelector('.form__error-list');
    errorList.innerHTML = '';

    if(errors.length > 0){
        errorListContainer.classList.toggle('form__error-list-container--hidden', false);
        for (error of errors){
            const li = document.createElement('li');
            li.innerHTML = error;
            errorList.appendChild(li);
        }
    }else{
        errorListContainer.classList.toggle('form__error-list-container--hidden', true);
    }
    
}

for(formContainer of forms){
    form = formContainer.querySelector('.form__form');
    
    form.addEventListener('input', e=>{
        if(e.target.getAttribute('type') === 'text' ||
            e.target.getAttribute('type') === 'number' ||
            e.target.tagName === 'SELECT' ||
            e.target.tagName === 'TEXTAREA')
        {
            const response = validate(e.target) || `Ha ocurrido un error validando ${e.target.id}`;
            styleInput(e.target, response);
            displayErrors(form)
        };
    });

    form.addEventListener('submit', e=>{
        e.preventDefault();
        let hasErrors = false;
        let errorList = [];
        const formElements = form.elements;

        for(let element of formElements){
            
            if (element.getAttribute('type') !== 'submit'){
                const response = validate(element) || `Ha ocurrido un error validando ${element.id}`;

                styleInput(element, response);
                
                if(response !== true){
                    hasErrors = true;
                    errorList.push(response);
                }
            }
        };

        if (hasErrors){
            displayErrors(form, errorList)
        }else{
            form.submit();
        }
    })

    const submitBtn = form.querySelector('.form__submit-btn');

    
    
}