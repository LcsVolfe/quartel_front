import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FormBuilder from '../presentation';
import { selectFormBuilder } from '../selectors';
import PropTypes from 'prop-types';
import {fetchFormBuilder} from "../action-creators";

const FormBuilderContainer = ({
	controls,
	onSubmit,
	title,
	isColumn,
	elevation,
}) => {
	const dispatch = useDispatch();

	const promisseFetchCpf = useCallback(
		(data) => {
			dispatch(fetchFormBuilder(data));
		},
		[dispatch]
	);
	const data = useSelector(selectFormBuilder);
	return (
		<FormBuilder
			{...data}
			onSubmit={promisseFetchCpf}
			controls={controls}
			title={title}
			isColumn={isColumn}
			elevation={elevation}
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

export default FormBuilderContainer;
