import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	createEmployeeWorkDay,
	fetchEmployeeWorkDay,
	handlerCalculateEmployeeWorkDay,
	DeleteNewWorkDay
} from '../action-creators';
import EmployeeWorkDay from '../presentation';
import {selectEmployeeWorkDay, selectEmployeeWorkDayCalculate} from '../selectors';

const EmployeeWorkDayContainer = (props) => {
	// Pega referência do dispatch da store
	const dispatch = useDispatch();

	const handlerEmployeeWorkDay = useCallback(() => {
		dispatch(fetchEmployeeWorkDay());
	}, [dispatch]);

	const handlerCreateNewWorkDay = useCallback((data) => {
		dispatch(createEmployeeWorkDay(data));
	}, [dispatch]);

	const handlerDeleteWorkDay = useCallback((data) => {
		dispatch(DeleteNewWorkDay(data));
	}, []);

	const handlerCalculateWorkDay = useCallback((data) => {
		dispatch(handlerCalculateEmployeeWorkDay(data));
	}, [dispatch]);

	useEffect(handlerEmployeeWorkDay, []);

	const data = useSelector(selectEmployeeWorkDay);
	// console.log(data)
	return <EmployeeWorkDay
		{...data}
		{...props}
		handlerCalculateWorkDay={handlerCalculateWorkDay}
		handlerCreateNewWorkDay={handlerCreateNewWorkDay}
		handlerDeleteWorkDay={handlerDeleteWorkDay} />;
};

export default EmployeeWorkDayContainer;
