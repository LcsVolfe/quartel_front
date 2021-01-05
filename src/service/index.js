import axios from "axios";

const urlBase = 'http://localhost:8000'

const fetchApi = async (parametro = '', method = 'GET', body) => {
    switch (method) {
        case 'GET':
            return ApiService.CheckErrors(await axios.get(`${urlBase}/${parametro}/`));

        case 'POST':
            return ApiService.CheckErrors(await axios.post(`${urlBase}/${parametro}/`, body));
    }

}

const findZipCode = (parametro) => {

    return fetch(`https://viacep.com.br/ws/${parametro}/json`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(res => ApiService.CheckErrors(res))
        .then(res => res.json())
}


const ApiService = {
    FindZipCode: zipCode => findZipCode(zipCode),
    ListClients: () => fetchApi('clients'),
    ListProducts: () => fetchApi('products'),
    CreateClient: client => fetchApi('clients', 'POST', client),
    AtualizarCliente: (id, cliente) => fetchApi(id, 'PUT', cliente),
    // ListaNomes: () => fetchApi('nome'),
    RemoveClientes: id => fetchApi(id, 'DELETE'),

    CheckErrors: res => {
        if (!res.statusText) {
            throw Error(res.responseText)
        }
        return res.data
    }
}
export default ApiService
