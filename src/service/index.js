import axios from "axios";
import {errorOnPromisse, finishOnPromisse, resultOnPromisse} from "../components/template/action-creators";

const URL_BASE = 'http://localhost:8000'


let cancelToken;

const fetchApi = async (path = '', method = 'GET', body, dispatch, id) => {
    // await delay(2000);

    switch (method) {
        case 'GET':
            if (typeof cancelToken != typeof undefined)
                cancelToken.cancel("Operation canceled due to new request.");
            cancelToken = axios.CancelToken.source();
            try {
                let res = await axios.get(`${URL_BASE}/${path}/`,{ cancelToken: cancelToken.token });
                if(path.includes('/')){
                    return mountApiResult(res, false, false)
                    // return res.data;
                }
                return mountApiResult(res)
                // return res.data.results;
            } catch (error) {
                return checkErrors(error, dispatch);
            }
            break;

        case 'POST':
            dispatch(finishOnPromisse());
            try {
                let response = await axios.post(`${URL_BASE}/${path}/`, body);
                if(response?.status === 201)
                    dispatch(resultOnPromisse(mountApiResult(response)))
                return response;
            } catch (error) {
                console.log(error)
                return checkErrors(error, dispatch);
            }
            break;


        case 'PUT':
            dispatch(finishOnPromisse());
            try {
                let response = await axios.put(`${URL_BASE}/${path}/`, body);
                if(response?.status === 200)
                    dispatch(resultOnPromisse(mountApiResult(response)))
                return response;
            } catch (error) {
                return checkErrors(error, dispatch);
            }
            break;


        case 'DELETE':
            try {
                let response = await axios.delete(`${URL_BASE}/${path}/${id}/`, body);
                if(response?.status === 204)
                    dispatch(resultOnPromisse(mountApiResult(response)))
                return response;
            } catch (error) {
                return checkErrors(error, dispatch);
            }
            break;

        default:
            break;

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

const mountApiResult = (res, error = false, pagination = true) => {
    console.log(res)
    return ({
        errorRequest: error,
        data: pagination ? res.data?.results : res.data,
        message: res.message,
        status: pagination ? res.status : res.status,
        statusText: res?.statusText || res.response?.statusText
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const ApiService = {
    FindZipCode: zipCode => findZipCode(zipCode),
    CreateForm: (data, path, dispatch) => fetchApi(path, 'POST', data, dispatch),
    UpdateForm: (data, path, dispatch) => fetchApi(path, 'PUT', data, dispatch, data?.id),
    Fetch: (path, dispatch) => fetchApi(path, 'GET', {}, dispatch),
    Delete: (id, path, dispatch) => fetchApi(path, 'DELETE', {}, dispatch, id),
}
export default ApiService
