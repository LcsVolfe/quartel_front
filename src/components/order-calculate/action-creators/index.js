import ApiService from "../../../service";

export const setOrderCalculate = (payload) => ({
	type: 'ORDER_CALCULATE_SET',
	payload,
});

export const orderCalculateError = () => ({ type: 'ORDER_CALCULATE_ERROR' });

export const loadingOrderCalculate = () => ({ type: 'ORDER_CALCULATE_LOADING' });

export const fetchOrderCalculate = (data, location, history, auth) => async (dispatch) => {
	dispatch(loadingOrderCalculate());
	try {
		const res = await ApiService.CustomRequest('order-calculate','POST', data, dispatch)
		// console.log(res)
		if(res.status != 200) return;
		dispatch(setOrderCalculate(res.data));
	} catch (err) {
		dispatch(orderCalculateError());
	}
};
