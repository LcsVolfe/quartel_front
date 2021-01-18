import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as onSubmitForm } from '../components/form-builder';
import { reducer as onLoadTable } from "../components/table-render";
import { reducer as onPromisse } from "../components/template";
import { reducer as onLogin } from "../components/login";

const rootReducer = combineReducers({
    onSubmitForm,
    onLoadTable,
    onPromisse,
    onLogin,
});

export const initStore = (initialState = {}) =>
    createStore(rootReducer, initialState, applyMiddleware(thunk));
