export const setTemplate = (payload) => ({
	type: 'TEMPLATE_SET',
	payload,
});

export const templateError = () => ({ type: 'TEMPLATE_ERROR' });

export const loadingOnPromisse = () => ({ type: 'ON_PROMISSE_LOADING' });

export const fetchOnPromisse = () => async (dispatch) => {
	dispatch(loadingOnPromisse());
};
