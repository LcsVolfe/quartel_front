import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Template from '../presentation';
import { selectOnPromisse } from '../selectors';
import PropTypes from 'prop-types';
import {templateSingOut} from "../action-creators";
import {useHistory} from "react-router-dom";

const TemplateContainer = ({ content, useAuth }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const auth = useAuth();

	const handlerSingOut = useCallback(() => {
		dispatch(templateSingOut(auth, history))
	}, [dispatch]);
	SingOutCB = handlerSingOut;

	const onPromisse = useSelector(selectOnPromisse);

	return (
		<Template
			handlerSingOut={handlerSingOut}
			{...onPromisse}
			content={content}
		></Template>
	);
};

TemplateContainer.propTypes = {
	content: PropTypes.any,
};

export var SingOutCB;
export default TemplateContainer;
