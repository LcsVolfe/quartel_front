import React from 'react';
import {useSelector} from 'react-redux';
import Template from '../presentation';
import { selectOnPromisse } from '../selectors';
import PropTypes from 'prop-types';

const TemplateContainer = ({ content, useAuth }) => {
	const onPromisse = useSelector(selectOnPromisse);
	return (
		<Template
			useAuth={useAuth}
			{...onPromisse}
			content={content}
		></Template>
	);
};

TemplateContainer.propTypes = {
	content: PropTypes.any,
};

export default TemplateContainer;
