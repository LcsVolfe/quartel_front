import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from "react-router-dom";
import FormBuilder from '../presentation';
import { selectFormBuilder } from '../selectors';
import PropTypes from 'prop-types';
import {fetchFormBuilder, loadAutoCompleteFormBuilder, loadDataFormBuilder} from "../action-creators";
import {finishOnPromisse} from "../../template/action-creators";
import {initApresentataion, loadingFormBuilder, setCompleteOption, setFormBuilder} from "../reducer";



const FormBuilderContainer = ({
	controls,
	title,
	isColumn,
	elevation,
}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();

	const promisseFetch = useCallback(
		(data, action) => {
			dispatch(fetchFormBuilder(data, action, history, onDismountComponent));
		},
		[dispatch]
	);

	const loadDataForPut = useCallback(
		() => {
			dispatch(loadingFormBuilder());
			if(query.get('id'))
				dispatch(loadDataFormBuilder(query.get('id'), history));
			else dispatch(initApresentataion(true));
			// setTimeout(()=>setRenderComponent(true), 1300)
		},
		[dispatch]
	);

	const handleAutoCompleteChange = useCallback(
		(searchTerm, path, prop) => {
			dispatch(loadAutoCompleteFormBuilder(searchTerm, path, prop))
		},
		[dispatch]
	);

	const onDismountComponent = useCallback(
		() => {
			dispatch(finishOnPromisse())
			dispatch(setFormBuilder({}))
			dispatch(initApresentataion(false));
		},
		[dispatch]
	);

	useEffect(()=>{
		loadDataForPut()
		return onDismountComponent
	}, []);

	const data = useSelector(selectFormBuilder);
	return (
		<>
			{ data.initRenderPresentationComponent ? <FormBuilder
				{...data}
				onSubmit={promisseFetch}
				controls={controls}
				title={title}
				isColumn={isColumn}
				elevation={elevation}
				dispatch={dispatch}
				onExit={onDismountComponent}
				handleAutoCompleteChange={handleAutoCompleteChange}
			/> : null}
		</>
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
