import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import TableRender from '../presentation';
import { selectTableRender } from '../selectors';
import PropTypes from 'prop-types';
import {deleteTable, fetchTableRender} from "../action-creators";

const TableRenderContainer = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const promisseFetch = useCallback(
		() => {
			dispatch(fetchTableRender(history));
		},
		[dispatch]
	);

	const deleteItem = useCallback(
		(listIds) => {
			dispatch(deleteTable(listIds, history));
		},
		[dispatch]
	);


	useEffect(()=> {
		promisseFetch()
	}, [])

	const data = useSelector(selectTableRender);

	return (
		<TableRender
			{...data}
			{...props}
			deleteItem={deleteItem}
			history={history}
		/>
	);
};

TableRenderContainer.propTypes = {
	callBack: PropTypes.func,
	title: PropTypes.string,
	columns: PropTypes.array,
};

export default TableRenderContainer;
