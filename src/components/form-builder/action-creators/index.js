import ApiService from "../../../service";
import {FormToList, TakePathAPIWithId, TakePathRoute} from "../../../utils/navigation";
import {initApresentataion, setCompleteOption, setFormBuilder} from "../reducer";




export const fetchFormBuilder = (data, action=1, history, onDismountComponent) => async (dispatch) => {
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
	let result = await ApiService.Fetch(TakePathAPIWithId(id, history), dispatch);
	// console.log(result)
	if(!result.errorRequest && result.data?.id){
		dispatch(setFormBuilder(result.data));
		dispatch(initApresentataion(true));
	}
};

export const loadAutoCompleteFormBuilder = (searchTerm, path, prop) => async (dispatch) => {
	dispatch(setCompleteOption({data: [], loading: true}))
	let result = await ApiService.Fetch(path+'?searchTerm='+searchTerm, dispatch);
	// console.log(result)
	if(!result.errorRequest && result.data.length > 0)
		dispatch(setCompleteOption({data: result.data, loading: false}))
};
