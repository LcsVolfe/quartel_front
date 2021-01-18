import {useState} from "react";
import ApiService from "../../../service";

export const setLogin = (payload) => ({
	type: 'LOGIN_SET',
	payload,
});

export const loginError = () => ({ type: 'LOGIN_ERROR' });

export const loadingLogin = () => ({ type: 'LOGIN_LOADING' });

export const fetchLogin = (data, location, history, auth) => async (dispatch) => {
	dispatch(loadingLogin());
	try {
		const res = await ApiService.CustomRequest('api/token', 'POST', data, dispatch)

		if(res.status != 200) return;
		// dispatch(setLogin(res.data));
		let { from } = location.state || { from: { pathname: "/" } };

		auth.signin(() => {
			history.replace(from);
		});


		// let login = (data) => {
		// 	auth.signin(() => {
		// 		history.replace(from);
		// 	});
		// };

		localStorage.setItem('AuthorizationToken', res.data.access)


	} catch (err) {
		localStorage.removeItem('AuthorizationToken')

		dispatch(loginError());
	}
};

export const useProvideAuth = () => {
	const [token, setToken] = useState(null);

	const signin = cb => {

		return fakeAuth.signin(() => {
			setToken("token");
			cb();
		});
	};

	const signout = cb => {
		localStorage.removeItem('AuthorizationToken')
		return cb();
	};

	return {
		token,
		signin,
		signout
	};
}


const fakeAuth = {
	isAuthenticated: false,
	signin(cb) {
		fakeAuth.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		fakeAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};

