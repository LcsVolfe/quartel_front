import ApiService from "../../../service";

export const setFormBuilder = (payload) => ({
	type: 'FORM_BUILDER_SET',
	payload,
});

export const formBuilderError = () => ({ type: 'FORM_BUILDER_ERROR' });

export const loadingFormBuilder = () => ({ type: 'FORM_BUILDER_LOADING' });

export const fetchFormBuilder = (data) => async (dispatch) => {
	dispatch(loadingFormBuilder());
	try {
		let result = await ApiService.CreateClient(data);
		// dispatch(setFormBuilder());
	} catch (err) {
		dispatch(formBuilderError());
	}
};
