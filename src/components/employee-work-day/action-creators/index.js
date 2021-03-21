import ApiService from "../../../service";

export const setEmployeeWorkDay = (payload) => ({
	type: 'EMPLOYEE_WORK_DAY_SET',
	payload,
});
export const setEmployeeWorkDayCalculate = (payload) => ({
	type: 'EMPLOYEE_WORK_DAY_CALCULATE_SET',
	payload,
});

export const employeeWorkDayError = () => ({ type: 'EMPLOYEE_WORK_DAY_ERROR' });

export const loadingEmployeeWorkDay = () => ({ type: 'EMPLOYEE_WORK_DAY_LOADING' });

export const fetchEmployeeWorkDay = () => async (dispatch) => {
	dispatch(loadingEmployeeWorkDay());
	try {
		const res = await ApiService.CustomRequest('employees-work-day-calendar','GET', {}, dispatch)
		if(res.status != 200) return;
		dispatch(setEmployeeWorkDay(res.data));
	} catch (err) {
		dispatch(employeeWorkDayError());
	}
};

export const createUpdateEmployeeWorkDay = (data) => async (dispatch) => {
	dispatch(loadingEmployeeWorkDay());
	try {
		let url = 'employees-work-day';
		let method = 'POST'
		if(data?.id){
			url += `/${data.id}`;
			method = 'PUT'
		}

		const res = await ApiService.CustomRequest(url,method, data, dispatch)
		if(res.status == 201 || res.status == 200)
			dispatch(fetchEmployeeWorkDay());
	} catch (err) {
		dispatch(employeeWorkDayError());
	}
};

export const DeleteNewWorkDay = (data) => async (dispatch) => {
	dispatch(loadingEmployeeWorkDay());
	try {
		const res = await ApiService.CustomRequest(`employees-work-day`,'DELETE', data, dispatch, data.id)
		if(res.status == 204)
			dispatch(fetchEmployeeWorkDay());
	} catch (err) {
		dispatch(employeeWorkDayError());
	}
};

export const ExecutePaymentWorkDays = (listId) => async (dispatch) => {
	dispatch(loadingEmployeeWorkDay());
	try {
		const res = await ApiService.CustomRequest(`employee-work-day-execute-payments`,'POST', listId, dispatch)
		return res;
		// if(res.status == 200)
		// 	dispatch(fetchEmployeeWorkDay());
	} catch (err) {
		dispatch(employeeWorkDayError());
	}
};


export const handlerCalculateEmployeeWorkDay = (data) => async (dispatch) => {
	dispatch(loadingEmployeeWorkDay());
	try {
		const res =  await ApiService.CustomRequest('employee-work-day-calculate','POST', data, dispatch);
		if(res.status == 200)
			dispatch(setEmployeeWorkDayCalculate(res.data));
	} catch (err) {
		dispatch(employeeWorkDayError());
	}
};
