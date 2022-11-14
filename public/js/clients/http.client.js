class Http {

    /* POST CONTENT TYPES*/
    postContentType = {
        json: async (url, data, body) => {
            return await fetch(url, {
                method: 'post',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' },
            }).then(r => r.json());
        },

        formData: async (url, data, body) => {
            return await fetch(url, {
                method: 'post',
                body: body,
            }).then(r => r.text());
        }
    }

    /* PUT CONTENT TYPES*/
    putContentType = {
        json: async (url, id, data, body) => {
            return await fetch(url + id, {
                method: 'put',
                body: JSON.stringify(data),
                headers: { 'content-type': 'application/json' },
            }).then(r => r.json());
        },

        formData: async (url, id, data, body) => {
            return await fetch(url + id, {
                method: 'put',
                body: body,
            }).then(r => r.text());
        }
    }

    /* GET */
    async get(url, id) {
        try {
            return await fetch(url + (id || ''), { method: 'get' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR GET', error);
        }
    }

    /* POST */
    async post(url, data, body, type = 'json') {
        try {
            return this.postContentType[type](url, data, body);
        } catch (error) {
            console.error('ERROR POST', error);
        }
    }

    /* PUT */
    async put(url, id, data, body, type = 'json') {
        try {
            return this.putContentType[type](url, id, data, body);
        } catch (error) {
            console.error('ERROR PUT', error);
        }
    }

    /* DELETE */
    async delete(url, id) {
        try {
            return await fetch(url + (id || ''), { method: 'delete' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR DELETE', error);
        }
    }
}

const http = new Http();

export default http;