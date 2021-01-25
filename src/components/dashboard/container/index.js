import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchDashboard, updateDebtDatePay} from '../action-creators';
import Dashboard from '../presentation';
import { selectDashboard } from '../selectors';

const DashboardContainer = (props) => {
	// Pega referência do dispatch da store
	const dispatch = useDispatch();

	const handlerDashboard = useCallback(() => {
		dispatch(fetchDashboard());
	}, [dispatch]);

	const handlerDebtDatePay = useCallback((data, id) => {
		dispatch(updateDebtDatePay(data, id));
	}, [dispatch]);

	useEffect(handlerDashboard, []);

	const data = useSelector(selectDashboard);
	// console.log(data)
	return <Dashboard {...data} {...props} onClick={handlerDashboard} handlerDebtDatePay={handlerDebtDatePay} />;
};

export default DashboardContainer;
