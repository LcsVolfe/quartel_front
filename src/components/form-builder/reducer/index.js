import { combineReducers } from 'redux';

export const onSubmitForm = (state = '', { type, payload }) => {
	switch (type) {
		case 'FORM_BUILDER_SET':
			return payload;

		default:
			return state;
	}
};

export const loading = (state = false, { type }) => {
	switch (type) {
		case 'FORM_BUILDER_LOADING':
			return true;

		case 'FORM_BUILDER_SET':
		case 'FORM_BUILDER_ERROR':
			return false;

		default:
			return state;
	}
};

export const initRenderPresentationComponent = (state = false, { type, payload }) => {
	switch (type) {
		case 'FORM_BUILDER_INIT_PRESENTATION':
			return payload;
		default:
			return state;
	}
};

export default combineReducers({ onSubmitForm, loading, initRenderPresentationComponent });
