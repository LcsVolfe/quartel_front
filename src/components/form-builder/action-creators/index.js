import ApiService from "../../../service";
import {FormToList, TakePathAPIWithId, TakePathRoute} from "../../../utils/navigation";

export const setFormBuilder = (payload) => ({
	type: 'FORM_BUILDER_SET',
	payload,
});

export const formBuilderError = () => ({ type: 'FORM_BUILDER_ERROR' });
export const loadingFormBuilder = () => ({ type: 'FORM_BUILDER_LOADING' });


export const fetchFormBuilder = (data, action, history) => async (dispatch) => {
	let result;
	switch(action){
		case 1:
			result = !data?.id ?
				await ApiService.CreateForm(data, TakePathRoute(history), dispatch):
				await ApiService.UpdateForm(data, TakePathAPIWithId(data.id, history), dispatch);
			if(!result?.errorRequest)
				FormToList(history)

			break;

		case 2:
			result = await ApiService.UpdateForm(data, TakePathRoute(history), dispatch);
			debugger
			// if(!result?.errorRequest)
			// 	FormToList(history)
			break;

		default:
			return false// dispatch(await ApiService.CreateClient(data));
	}
};

export const loadDataFormBuilder = (id, history) => async (dispatch) => {
	let result = await ApiService.LoadForm(TakePathAPIWithId(id, history));
	if(result?.id)
		dispatch(setFormBuilder(result));
};
