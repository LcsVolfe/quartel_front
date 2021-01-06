import {finishOnPromisse, loadingOnPromisse} from "../../template/action-creators";
import ApiService from "../../../service";
import {TakePathRoute} from "../../../utils/navigation";

export const setTableRender = (payload) => ({
	type: 'TABLE_RENDER_SET',
	payload,
});

export const TableRenderError = () => ({ type: 'TABLE_RENDER_ERROR' });
export const loadingTableRender = () => ({ type: 'TABLE_RENDER_LOADING' });
export const finishTableRender = () => ({ type: 'TABLE_RENDER_FINISH' });



export const fetchTableRender = (history) => async (dispatch) => {
	dispatch(loadingOnPromisse());
	dispatch(loadingTableRender());
	try {
		let result = await ApiService.ListTable(TakePathRoute(history));
		// await delay(1000);

		dispatch(finishOnPromisse());
		dispatch(finishTableRender());
		dispatch(setTableRender(result));
	} catch (err) {
		dispatch(TableRenderError());
	}
};

export const deleteTable = (listIds, history) => async (dispatch) => {
	dispatch(loadingOnPromisse());
	try {
		for (const id of listIds) {
			await ApiService.DeleteTable(id, TakePathRoute(history), dispatch);
		}
		let result = await ApiService.ListTable(TakePathRoute(history));
		dispatch(setTableRender(result));
		// await delay(1000);
		dispatch(finishOnPromisse());
	} catch (err) {
		dispatch(finishOnPromisse());
	}
};


const delay = ms => new Promise(res => setTimeout(res, ms));
