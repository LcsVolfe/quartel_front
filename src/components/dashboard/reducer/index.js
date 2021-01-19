import { combineReducers } from 'redux';

export const dashboard = (state = '', { type, payload }) => {
	switch (type) {
		case 'DASHBOARD_SET':
			return payload;

		default:
			return state;
	}
};

export const loading = (state = false, { type }) => {
	switch (type) {
		case 'DASHBOARD_LOADING':
			return true;

		case 'DASHBOARD_SET':
		case 'DASHBOARD_ERROR':
			return false;

		default:
			return state;
	}
};

export default combineReducers({ dashboard, loading });
