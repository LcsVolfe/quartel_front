import ApiService from "../../../service";
import {finishOnPromisse, loadingOnPromisse} from "../../template/action-creators";

export const setDashboard = (payload) => ({
	type: 'DASHBOARD_SET',
	payload,
});

export const dashboradError = () => ({ type: 'DASHBOARD_ERROR' });

export const loadingDashboard = () => ({ type: 'DASHBOARD_LOADING' });

export const fetchDashboard = (data, location, history, auth) => async (dispatch) => {
	dispatch(loadingOnPromisse());
	dispatch(loadingDashboard());
	try {
		const res = await ApiService.CustomRequest('dashboard','GET', {}, dispatch)
		// console.log(res)
		dispatch(finishOnPromisse());
		if(res.status != 200) return;
		dispatch(setDashboard(res.data));
	} catch (err) {
		dispatch(finishOnPromisse());
		dispatch(dashboradError());
	}
};

export const updateDebtDatePay = (data, id) => async (dispatch) => {
	dispatch(loadingOnPromisse());

	// dispatch(loadingDashboard());
	try {
		const res = await ApiService.CustomRequest('debt-payments/'+id,'PUT', data, dispatch, id)
		dispatch(finishOnPromisse());
		if(res.status != 200) return;
		dispatch(fetchDashboard())
	} catch (err) {
		dispatch(finishOnPromisse());
		dispatch(dashboradError());
	}
};
