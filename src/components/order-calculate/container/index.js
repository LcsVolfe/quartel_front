import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchOrderCalculate} from '../action-creators';
import OrderCalculate from '../presentation';
import { selectOrderCalculate } from '../selectors';

const OrderCalculateContainer = (props) => {
	// Pega referência do dispatch da store
	const dispatch = useDispatch();

	const handlerOrderCalculate = useCallback((data) => {
		dispatch(fetchOrderCalculate(data));
	}, [dispatch]);

	// useEffect(handlerOrderCalculate, []);

	const data = useSelector(selectOrderCalculate);
	// console.log(data)
	return <OrderCalculate {...data} {...props} onClick={handlerOrderCalculate} />;
};

export default OrderCalculateContainer;
