import { combineReducers } from 'redux';

export const orderCalculate = (state = '', { type, payload }) => {
	switch (type) {
		case 'ORDER_CALCULATE_SET':
			return payload;

		default:
			return state;
	}
};

export const loading = (state = false, { type }) => {
	switch (type) {
		case 'ORDER_CALCULATE_LOADING':
			return true;

		case 'ORDER_CALCULATE_SET':
		case 'ORDER_CALCULATE_ERROR':
			return false;

		default:
			return state;
	}
};

export default combineReducers({ orderCalculate, loading });
