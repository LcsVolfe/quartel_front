import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	createUpdateEmployeeWorkDay,
	fetchEmployeeWorkDay,
	handlerCalculateEmployeeWorkDay,
	DeleteNewWorkDay, ExecutePaymentWorkDays
} from '../action-creators';
import EmployeeWorkDay from '../presentation';
import {selectEmployeeWorkDay, selectEmployeeWorkDayCalculate} from '../selectors';

const EmployeeWorkDayContainer = (props) => {
	// Pega referência do dispatch da store
	const dispatch = useDispatch();

	const handlerEmployeeWorkDay = useCallback(() => {
		dispatch(fetchEmployeeWorkDay());
	}, [dispatch]);

	const handlerCreateUpdateWorkDay = useCallback((data) => {
		dispatch(createUpdateEmployeeWorkDay(data));
	}, [dispatch]);

	const handlerDeleteWorkDay = useCallback((data) => {
		dispatch(DeleteNewWorkDay(data));
	}, []);

	const executePaymentWorkDays = useCallback((data, filters) => {
		dispatch(ExecutePaymentWorkDays(data));
		// dispatch(handlerCalculateEmployeeWorkDay(filters));
		// dispatch(fetchEmployeeWorkDay());
	}, []);

	const handlerCalculateWorkDay = useCallback((data) => {
		dispatch(handlerCalculateEmployeeWorkDay(data));
		dispatch(fetchEmployeeWorkDay());
	}, [dispatch]);

	useEffect(handlerEmployeeWorkDay, []);

	const data = useSelector(selectEmployeeWorkDay);
	// console.log(data)
	return <EmployeeWorkDay
		{...data}
		{...props}
		executePaymentWorkDays={executePaymentWorkDays}
		handlerCalculateWorkDay={handlerCalculateWorkDay}
		handlerCreateUpdateWorkDay={handlerCreateUpdateWorkDay}
		handlerDeleteWorkDay={handlerDeleteWorkDay} />;
};

export default EmployeeWorkDayContainer;
