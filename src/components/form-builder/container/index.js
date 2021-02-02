import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from "react-router-dom";
import FormBuilderPresentation from '../presentation';
import { selectFormBuilder } from '../selectors';
import PropTypes from 'prop-types';
import {fetchFormBuilder, loadAutoCompleteFormBuilder, loadDataFormBuilder} from "../action-creators";
import {finishOnPromisse} from "../../template/action-creators";
import {initApresentataion, loadingFormBuilder, setCompleteOption, setFormBuilder} from "../reducer";



const FormBuilderContainer = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();
	const [render, setRender] = useState(false);

	const promisseFetch = useCallback(
		async (data, action) => {
			if(props?.onClick) return;
			dispatch(fetchFormBuilder(data, action, history, onDismountComponent));
		},
		[dispatch]
	);

	const loadDataForPut = useCallback(
		 () => {
			dispatch(loadingFormBuilder());
			if(query.get('id'))
				dispatch(loadDataFormBuilder(query.get('id'), history, setRender));
			else {
				if (props?.initValues)
					dispatch(setFormBuilder(props.initValues));
				// dispatch(initApresentataion(true));
				setRender(true)

			}
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
			// dispatch(initApresentataion(false));
			setRender(false)
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
			{render && <FormBuilderPresentation
				{...data}
				{...props}
				onSubmit={promisseFetch}
				dispatch={dispatch}
				onExit={onDismountComponent}
				handleAutoCompleteChange={handleAutoCompleteChange}
			/>}
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
