class Http {

    /* GET */
    async get(url, id) {
        try {
            return await fetch(url + (id || ''), { method: 'get' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR GET', error);
        }
    }

    /* POST */
    async post(url, dato) {
        try {
            const formData  = new FormData();

            for(const name in dato) {
                formData.append(name, dato[name]);
            }

            console.log(formData);

            return await fetch(url, {
                method: 'post',
                body: formData
            }).then(r => r.text());
        } catch (error) {
            console.error('ERROR POST', error);
        }
    }

    /* PUT */
    async put(url, id, dato) {
        try {
            const formData  = new FormData();

            for(const name in dato) {
                formData.append(name, dato[name]);
            }

            return await fetch(url + id, {
                method: 'put',
                body: formData
            }).then(r => r.text());
        } catch (error) {
            console.error('ERROR PUT', error);
        }
    }

    /* DELETE */
    async delete(url, id) {
        try {
            return await fetch(url + id, { method: 'delete' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR DELETE', error);
        }
    }   
    async del() {
        console.error('No llamar a del(), sino a delete()!');
    }   
}

const http = new Http();

export default http;