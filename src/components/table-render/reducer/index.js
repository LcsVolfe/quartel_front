import { combineReducers } from 'redux';

export const onLoadTable = (state = '', { type, payload }) => {
	switch (type) {
		case 'TABLE_RENDER_SET':
			return payload;

		default:
			return state;
	}
};

export const loading = (state = false, { type }) => {
	switch (type) {
		case 'TABLE_RENDER_LOADING':
			return true;

		case 'TABLE_RENDER_SET':
		case 'TABLE_RENDER_ERROR':
			return false;

		default:
			return state;
	}
};

export default combineReducers({ onLoadTable, loading });
