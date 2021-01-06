import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from "react-router-dom";
import FormBuilder from '../presentation';
import { selectFormBuilder } from '../selectors';
import PropTypes from 'prop-types';
import {fetchFormBuilder, loadDataFormBuilder, setFormBuilder} from "../action-creators";
import {onSubmitForm} from "../reducer";



const FormBuilderContainer = ({
	controls,
	title,
	isColumn,
	elevation,
	onSubmit
}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();

	const promisseFetch = useCallback(
		(data, action) => {
			dispatch(fetchFormBuilder(data, action, history));
		},
		[dispatch]
	);

	const loadDataForPut = useCallback(
		() => {
			if(query.get('id'))
				dispatch(loadDataFormBuilder(query.get('id'), history));
			else
				dispatch(setFormBuilder({}))
		},
		[dispatch]
	);

	useEffect(loadDataForPut, []);
	const data = useSelector(selectFormBuilder);
	return (
		<FormBuilder
			{...data}
			onSubmit={promisseFetch}
			controls={controls}
			title={title}
			isColumn={isColumn}
			elevation={elevation}
			dispatch={dispatch}
		/>
	);
};

FormBuilderContainer.propTypes = {
	controls: PropTypes.array,
	onSubmit: PropTypes.func,
	title: PropTypes.string,
	isColumn: PropTypes.bool,
	elevation: PropTypes.number,
};


const useQuery = () => {
	return new URLSearchParams(useLocation().search);
}

export default FormBuilderContainer;
