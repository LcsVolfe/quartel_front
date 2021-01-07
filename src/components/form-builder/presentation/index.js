import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import {
	AppBar, FormControl,
	Grid, IconButton, InputLabel,
	MenuItem,
	Paper,
	Select, Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import typesEnum from '../enum/types.enum';
import Box from '@material-ui/core/Box';
import {Link, useLocation} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import {ptBR} from "date-fns/locale";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MultiSelectComponent from "./multi-select";
import {finishOnPromisse} from "../../template/action-creators";
import {reducer as onSubmitForm} from "../index";


const FormBuilder = ({ controls, onSubmit, title, isColumn, elevation, dispatch, onSubmitForm }) => {
	let location = useLocation();
	const classes = useStyles();
	let fieldsState = {};

	const checkControls = (onSubmitForm) => {
		controls.forEach(field => {
			let value;
			if(
				onSubmitForm?.id || (field.type === typesEnum.BOOLEAN ||
				field.type === typesEnum.MULTISELECT ||
				field.defaultValue)
			)
				value = onSubmitForm?.id ? onSubmitForm[field.name] :
					field.defaultValue ? field.defaultValue : false;

			if(field.type === typesEnum.DATE)
				value = field.defaultValue ? field.defaultValue : new Date();

			fieldsState[field.name] = value;
			setValue(field.name, value)
		});
		// setState({...state, ...fieldsState})
	}
	const [state, setState] = React.useState(fieldsState);
	const { register, handleSubmit, control, errors, setValue, watch } = useForm({defaultValues: fieldsState});

	const multiListUpdate = (data, name) => setFormState(name, data);
	const handleChangeSwitch = (event) => setFormState(event.target.name, event.target.checked);
	const handleChangeSelect = (event) => setFormState(event.target.name, event.target.value)
	const handleDateChange = (date, value, name) => setFormState(name, date);


	const setFormState = (name, value) => {
		setValue(name, value)
		setState({ ...state, [name]: value });
	}


	const defineTypeAction = (action) => {
		let data = {...state, ...watch()};
		if(onSubmitForm?.id)
			data = {id: onSubmitForm.id, ...data}
		onSubmit(data, action);
	}

	const onError = (errors, e) => console.log(errors, e);
	// checkControls()
	useEffect(()=>checkControls(onSubmitForm), [onSubmitForm]);

	return (
		<Paper className={classes.paper}>
			<Box p={4} className={classes.box}>
				<h1>Formulário de Produto</h1>

				<AppBar position="relative" >
					<Toolbar className={classes.toolBarForm}>
						<IconButton color="inherit" onClick={()=>dispatch(finishOnPromisse())} component={Link} to={location.pathname.replace('form', 'list')}>
							<ArrowBackIcon />
						</IconButton>
						<IconButton color="inherit" onClick={() => defineTypeAction(1)}>
							<SaveIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<form className={classes.form} onSubmit={handleSubmit(defineTypeAction, onError)}>

					{controls.map((field, index)=>{
						switch (field.type) {
							case typesEnum.TEXT:
							case typesEnum.NUMBER:
							case typesEnum.PASSWORD:
							case typesEnum.EMAIL:
								return (
									<TextField
										key={index}
										name={field.name}
										error={!!errors[field.name]}
										label={field.label || field.name}
										type={field.type}
										inputRef={register(field.validations)}
										helperText={errors[field.name]?.message}
										// onChange={(e) => {
										//     console.log(e.target.value);
										// }}
									/>
								);

							case typesEnum.SELECT:
								field.options = field?.options || [{label: 'Defina as opções', value: 0}]
								return (
									<Controller
										key={index}
										as={
											<FormControl>
												<InputLabel id={field.name}>{field.label}</InputLabel>
												<Select
													labelId={field.name}
													label={field.label || field.name}
													name={field.name}
													onChange={handleChangeSelect}
												>
													{field.options.map((item, i) => {
														return (<MenuItem key={i} value={item.value}>{item.label}</MenuItem>)
													})}
												</Select>
											</FormControl>
										}
										control={control}
										name={field.name}
									/>
								);

							case typesEnum.BOOLEAN:
								return (
									<Box key={index} className={classes.boolean}>
										<Switch
											inputRef={register}
											checked={state[field.name] || false}
											onChange={handleChangeSwitch}
											name={field.name}
											color="primary"
										/>
										<span>{field.label}</span>
									</Box>
								);

							case typesEnum.MULTISELECT:
								return (<MultiSelectComponent {...field} key={index} onResult={multiListUpdate}  />);

							case typesEnum.DATE:
								return (
									<MuiPickersUtilsProvider key={index} utils={DateFnsUtils} locale={ptBR}>
										<Grid container justify="space-around">
											<KeyboardDatePicker
												variant={'inline'}
												format="dd/MM/yyyy"
												label={field.label || field.name}
												value={state[field.name]}
												onChange={(date, value) => handleDateChange(date, value, field.name)}
											/>
											{/*<KeyboardTimePicker*/}
											{/*    margin="normal"*/}
											{/*    id="time-picker"*/}
											{/*    label="Time picker"*/}
											{/*    value={selectedDate}*/}
											{/*    onChange={handleDateChange}*/}
											{/*    KeyboardButtonProps={{*/}
											{/*        'aria-label': 'change time',*/}
											{/*    }}*/}
											{/*/>*/}
										</Grid>
									</MuiPickersUtilsProvider>
								);

							case typesEnum.CPF:
							case typesEnum.CNPJ:
							case typesEnum.PHONE:
							case typesEnum.ZIPCODE:
							case typesEnum.MASK:
								let maskPatter =
									field.type === typesEnum.CPF ? '999.999.999-99' :
										field.type === typesEnum.CNPJ ? '99.999.999/9999-99':
											field.type === typesEnum.PHONE ? '(99) 99999-9999':
												field.type === typesEnum.ZIPCODE ? '99999-999':
													field?.mask
								return (
									<Controller
										key={index}
										as={
											<InputMask mask={maskPatter}>
												{() => (
													<TextField
														error={!!errors[field.name]}
														name={field.name}
														label={field.label ||field.name}
														helperText={errors[field.name]?.message}
													/>
												)}
											</InputMask>
										}
										control={control}
										name={field.name}
										rules={{validate: (value) => field?.validations?.rule ? field.validations.rule(value) : null}}
									/>
								);

							default:
								return <span key={field.name}>Elemento não encontrado. {field.name}</span>
						}
					})}

				</form>

			</Box>
		</Paper>
	);
}

FormBuilder.propTypes = {
	controls: PropTypes.array,
	onSubmit: PropTypes.func,
	loading: PropTypes.bool,
	isColumn: PropTypes.bool,
	title: PropTypes.string,
	elevation: PropTypes.number,
};



export default FormBuilder;



const useStyles = makeStyles((theme) => ({
	form: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'baseline'
	},
	paper: {
		display: 'flex',
		justifyContent: 'center',
		maxWidth: '800px',
		margin: '0 auto',
	},
	box: {
		maxWidth: '750px',
		justifyContent: 'center'
	},
	boolean: {
		order: 1
	},
	toolBarForm: {
		display: 'flex',
		justifyContent: 'space-between'
	},
}));
