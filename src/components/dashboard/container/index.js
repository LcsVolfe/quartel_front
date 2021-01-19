import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboard } from '../action-creators';
import Dashboard from '../presentation';
import { selectDashboard } from '../selectors';

const DashboardContainer = (props) => {
	// Pega referência do dispatch da store
	const dispatch = useDispatch();

	const handler = useCallback(() => {
		dispatch(fetchDashboard());
	}, [dispatch]);

	useEffect(handler, []);

	const data = useSelector(selectDashboard);
	console.log(data)
	return <Dashboard {...data} {...props} onClick={handler} />;
};

export default DashboardContainer;
