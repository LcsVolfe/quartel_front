import { combineReducers } from 'redux';

export const employeeWorkDay = (state = [], { type, payload }) => {
	switch (type) {
		case 'EMPLOYEE_WORK_DAY_SET':
			return payload;

		default:
			return state;
	}
};

export const employeeWorkDayCalculate = (state = '', { type, payload }) => {
	switch (type) {
		case 'EMPLOYEE_WORK_DAY_CALCULATE_SET':
			return payload;

		default:
			return state;
	}
};

export const loading = (state = false, { type }) => {
	switch (type) {
		case 'EMPLOYEE_WORK_DAY_LOADING':
		case 'EMPLOYEE_WORK_DAY_CALCULATE_LOADING':
			return true;

		case 'EMPLOYEE_WORK_DAY_SET':
		case 'EMPLOYEE_WORK_DAY_ERROR':
		case 'EMPLOYEE_WORK_DAY_CALCULATE_SET':
		case 'EMPLOYEE_WORK_DAY_CALCULATE_ERROR':
			return false;

		default:
			return state;
	}
};

export default combineReducers({ employeeWorkDay, employeeWorkDayCalculate, loading });
