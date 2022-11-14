class Toast {
    static toastsContainer = document.querySelector('.confirmation-toast');
    static showToast = (message)=>{
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

        toast = Toast.toastsContainer.querySelector('.confirmation-toast__item');
        if (toast !== null){
            toast.remove();
        };

        Toast.toastsContainer.insertAdjacentHTML('beforeend', toastElement)

        toast = Toast.toastsContainer.querySelector('.confirmation-toast__item')

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
}

export default Toast