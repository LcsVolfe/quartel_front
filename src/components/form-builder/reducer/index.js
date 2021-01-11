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


export const autoCompleteOption = (state = {data: [], loading: false}, { type, payload }) => {
	switch (type) {
		case 'FORM_BUILDER_AUTO_COMPLETE_OPTION':
			return payload;
		default:
			return state;
	}
};

export const setCompleteOption = (payload) => ({type: 'FORM_BUILDER_AUTO_COMPLETE_OPTION', payload});
export const setFormBuilder = (payload) => ({type: 'FORM_BUILDER_SET', payload});
export const formBuilderError = () => ({ type: 'FORM_BUILDER_ERROR' });
export const loadingFormBuilder = () => ({ type: 'FORM_BUILDER_LOADING' });
export const initApresentataion = (payload) => ({ type: 'FORM_BUILDER_INIT_PRESENTATION', payload });

export default combineReducers({ onSubmitForm, loading, initRenderPresentationComponent, autoCompleteOption });
