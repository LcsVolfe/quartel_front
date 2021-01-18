import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../action-creators';
import Login from '../presentation';
import { selectLogin } from '../selectors';

const LoginContainer = (props) => {
	// Pega referência do dispatch da store
	const dispatch = useDispatch();

	// Cria o handler de ação
	const onSubmit = useCallback((data) => {
		dispatch(fetchLogin(data, props.location, props.history, props.auth));
	}, [dispatch]);

	// Chama a ação assim que o componente é montado
	// useEffect(handler, []);

	// Seleciona os dados da store
	const data = useSelector(selectLogin);
	return <Login {...data} {...props} onClick={onSubmit} />;
};

export default LoginContainer;
