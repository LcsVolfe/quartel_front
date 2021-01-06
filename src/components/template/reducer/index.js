import { combineReducers } from 'redux';

export const onPromisse = (state = false, { type, payload }) => {
	switch (type) {
		case 'ON_PROMISSE_LOADING':
			return true;

		case 'ON_PROMISSE_FINISH':
			return false;

		case 'ON_PROMISSE_SET':
		case 'ON_PROMISSE_ERROR':
			return payload;

		default:
			return state;
	}
};


export default combineReducers({ onPromisse });
