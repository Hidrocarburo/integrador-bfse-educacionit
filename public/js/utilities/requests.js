class Requests {
    static async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    static async getHbsTemplate (URL) {
        try {
            const pseudoHTML = await Requests.ajax(URL);
            return pseudoHTML
        } catch(error) {
            console.error('getHbsTemplate() exception: error while trying to get hbs template: ', error);
            return '';
        }
    }
}

export default Requests;