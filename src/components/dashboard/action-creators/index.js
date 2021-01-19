import ApiService from "../../../service";

export const setDashboard = (payload) => ({
	type: 'DASHBOARD_SET',
	payload,
});

export const dashboradError = () => ({ type: 'DASHBOARD_ERROR' });

export const loadingDashboard = () => ({ type: 'DASHBOARD_LOADING' });

export const fetchDashboard = (data, location, history, auth) => async (dispatch) => {
	dispatch(loadingDashboard());
	try {
		const res = await ApiService.CustomRequest('dashboard','GET', {}, dispatch)
		// console.log(res)
		if(res.status != 200) return;
		dispatch(setDashboard(res.data));
	} catch (err) {
		dispatch(dashboradError());
	}
};
