import { combineReducers } from 'redux';

export const login = (state = '', { type, payload }) => {
	switch (type) {
		case 'LOGIN_SET':
			return payload;

		default:
			return state;
	}
};

export const loading = (state = false, { type }) => {
	switch (type) {
		case 'LOGIN_LOADING':
			return true;

		case 'LOGIN_SET':
		case 'LOGIN_ERROR':
			return false;

		default:
			return state;
	}
};

export default combineReducers({ login, loading });
