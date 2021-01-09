import axios from "axios";
import {errorOnPromisse, finishOnPromisse, resultOnPromisse} from "../components/template/action-creators";

const URL_BASE = 'http://localhost:8000'



const fetchApi = async (path = '', method = 'GET', body, dispatch, id) => {
    switch (method) {
        case 'GET':
            try {
                let res = await axios.get(`${URL_BASE}/${path}/`);
                if(path.includes('/'))
                    return res.data
                return res.data.results
            } catch (error) {
                return checkErrors(error, dispatch);
            }


        case 'POST':
            dispatch(finishOnPromisse());
            try {
                let response = await axios.post(`${URL_BASE}/${path}/`, body);
                if(response?.status === 201)
                    dispatch(resultOnPromisse(mountApiResult(response, false)))

                return response;
            } catch (error) {
                return checkErrors(error, dispatch);
            }

        case 'PUT':
            dispatch(finishOnPromisse());
            try {
                let response = await axios.put(`${URL_BASE}/${path}/`, body);
                if(response?.status === 200)
                    dispatch(resultOnPromisse(mountApiResult(response, false)))
                return response;
            } catch (error) {
                return checkErrors(error, dispatch);
            }

        case 'DELETE':
            try {
                let response = await axios.delete(`${URL_BASE}/${path}/${id}/`, body);
                if(response?.status === 204)
                    dispatch(resultOnPromisse(mountApiResult(response, false)))
                return response;
            } catch (error) {
                return checkErrors(error, dispatch);
            }

        default:
            return
    }

}

const checkErrors = (res, dispatch) => {
    let error = mountApiResult(res, true);
    dispatch(errorOnPromisse(error))
    return error;
}

const findZipCode = (zipCode) =>  {

    return fetch(`https://viacep.com.br/ws/${zipCode}/json`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(res => checkErrors(res, {}))
        .then(res => res.json())
}

const mountApiResult = (res, error) => ({
    errorRequest: error,
    data: res?.response?.data,
    message: res?.message,
    status: res?.response?.status,
    statusText: res?.response?.statusText
});



const ApiService = {
    FindZipCode: zipCode => findZipCode(zipCode),
    ListProducts: () => fetchApi('products'),
    CreateForm: (data, path, dispatch) => fetchApi(path, 'POST', data, dispatch),
    UpdateForm: (data, path, dispatch) => fetchApi(path, 'PUT', data, dispatch, data?.id),
    LoadForm: (path) => fetchApi(path),
    ListTable: (path) => fetchApi(path),
    DeleteTable: (id, path, dispatch) => fetchApi(path, 'DELETE', {}, dispatch, id),
    BatchDeleteTable: (data, path, dispatch) => fetchApi(path, 'DELETE', dispatch),
    RemoveClientes: id => fetchApi(id, 'DELETE'),
}
export default ApiService
