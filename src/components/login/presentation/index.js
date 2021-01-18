import React, {useState} from 'react';
import PropTypes from 'prop-types';

import PStypesEnum from "../../form-builder/enum/types.enum";
import validators from "../../form-builder/enum/validators.enum";
import {
	Avatar,
	Button,
	Checkbox,
	CssBaseline,
	FormControlLabel,
	Grid, Link, makeStyles,
	Paper,
	Typography
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {FormBuilder} from "../../form-builder";

const Login = ({loading, onClick }) => {
	const classes = useStyles();


	let fields = [
		{
			name: 'username',
			label: 'Usuário',
			type: PStypesEnum.TEXT,
			validations: {
				required: validators.required(),
			},
		},
		{
			name: 'password',
			label: 'Senha',
			type: PStypesEnum.PASSWORD,
			validations: {
				required: validators.required(),
			},
		}
	];

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Entrar
					</Typography>
					<FormBuilder
						onClick={onClick}
						controls={fields}
						actionBar={false}
						isColumn={true}
						inputFullWidth={true}
						elevation={0}
						submitFormByBtnClick={true}
					/>
					{/*<form className={classes.form} >*/}
					{/*	<TextField*/}
					{/*		variant="outlined"*/}
					{/*		margin="normal"*/}
					{/*		required*/}
					{/*		fullWidth*/}
					{/*		id="email"*/}
					{/*		label="Email"*/}
					{/*		name="email"*/}
					{/*		autoComplete="email"*/}
					{/*		autoFocus*/}
					{/*	/>*/}
					{/*	<TextField*/}
					{/*		variant="outlined"*/}
					{/*		margin="normal"*/}
					{/*		required*/}
					{/*		fullWidth*/}
					{/*		name="password"*/}
					{/*		label="Password"*/}
					{/*		type="password"*/}
					{/*		id="password"*/}
					{/*		autoComplete="current-password"*/}
					{/*	/>*/}
					{/*	<FormControlLabel*/}
					{/*		control={<Checkbox value="remember" color="primary" />}*/}
					{/*		label="Remember me"*/}
					{/*	/>*/}
					{/*	<Button*/}
					{/*		onClick={login}*/}
					{/*		fullWidth*/}
					{/*		variant="contained"*/}
					{/*		color="primary"*/}
					{/*		className={classes.submit}*/}
					{/*	>*/}
					{/*		Login*/}
					{/*	</Button>*/}
					{/*</form>*/}
				</div>
			</Grid>
		</Grid>
	);
}


Login.propTypes = {
	word: PropTypes.string,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
};

export default Login;


function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}



const useStyles = makeStyles((theme) => ({
	vh: {
		height: '100vh'
	},
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

