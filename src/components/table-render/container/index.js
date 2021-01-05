import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableRender from '../presentation';
import { selectTableRender } from '../selectors';
import PropTypes from 'prop-types';
import {fetchTableRender} from "../action-creators";

const TableRenderContainer = ({
	title,
	callBack,
	columns
}) => {
	const dispatch = useDispatch();
	const promisseFetch = useCallback(
		() => {
			dispatch(fetchTableRender(callBack));
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
			title={title}
			columns={columns}
		/>
	);
};

TableRenderContainer.propTypes = {
	callBack: PropTypes.func,
	title: PropTypes.string,
	columns: PropTypes.array,
};

export default TableRenderContainer;
