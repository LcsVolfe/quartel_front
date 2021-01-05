import { combineReducers } from 'redux';

export const template = (state = '', { type, payload }) => {
	switch (type) {
		case 'TEMPLATE_SET':
			return payload;

		default:
			return state;
	}
};

export const onPromisse = (state = false, { type }) => {
	switch (type) {
		case 'ON_PROMISSE_LOADING':
			return true;

		case 'ON_PROMISSE_FINISH':
			return false;

		case 'ON_PROMISSE_SET':
		case 'ON_PROMISSE_ERROR':
			return false;

		default:
			return state;
	}
};

export default combineReducers({ template, onPromisse });
