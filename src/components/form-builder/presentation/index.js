import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import {
	AppBar, FormControl,
	Grid, IconButton, InputAdornment, InputLabel,
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
import CustomInputMask from "./custom-input-mask";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {setFormBuilder} from "../action-creators";




const FormBuilder = ({ controls, onSubmit, title, isColumn, elevation, dispatch, onSubmitForm, onExit }) => {
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
			// setFormState(field.name, value)
		});
	}
	checkControls(onSubmitForm)
	const [state, setState] = useState(fieldsState);
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

		controls.map(control => {
			let value;
			switch (control.type){
				case typesEnum.CURRENCY:
					console.log(String(data[control.name]))
					value = String(data[control.name]).replaceAll(' ', '').replace(',', '.');
					console.log(value)

					data[control.name] = value;
					break;

				case typesEnum.CPF:
				case typesEnum.CNPJ:
				case typesEnum.ZIPCODE:
				case typesEnum.PHONE:
					value = String(data[control.name]).replace(/[^0-9]/g, '');
					data[control.name] = value;
					break;

				default: break;
			}
		});

		onSubmit(data, action);
	}

	const onError = (errors, e) => console.log(errors, e);

	return (
		<Paper className={classes.paper}>
			<Box p={4} className={classes.box}>
				<h1>Formulário de Produto</h1>

				<AppBar position="relative" >
					<Toolbar className={classes.toolBarForm}>
						<IconButton color="inherit" onClick={onExit} component={Link} to={location.pathname.replace('form', 'list')}>
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
										inputRef={register(field?.validations)}
										helperText={errors[field.name]?.message}
										// value={state[field.name]}
										// onChange={(e) => {
										//     console.log(e.target.value);
										// }}
									/>
								);

							case typesEnum.SELECT:
								field.options = field?.options || [{label: 'Defina as opções', value: 0}]
								return (
									<FormControl key={index}>
										<InputLabel id={field.name}>{field.label}</InputLabel>
										<Select
											labelId={field.name}
											label={field.label || field.name}
											name={field.name}
											value={state[field.name]}
											inputRef={register(field?.validations)}
											onChange={handleChangeSelect}
										>
											{field.options.map((item, i) => {
												return (<MenuItem key={i} value={item.value}>{item.label}</MenuItem>)
											})}
										</Select>
									</FormControl>
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
										</Grid>
									</MuiPickersUtilsProvider>
								);

							case typesEnum.CURRENCY:

								return (
									<Controller
										key={index}
										as={
											<CurrencyTextField
												label={field.label || field.name}
												currencySymbol="R$ "
												outputFormat={"number"}
												decimalCharacter=","
												digitGroupSeparator=" "
												helperText={errors[field.name]?.message}
												// onChange={(event, value)=> setValue(value)}
											/>
										}
										control={control}
										name={field.name}
										rules={{validate: (value) => field?.validations?.rule ? field.validations.rule(value) : null}}
									/>);

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
													field?.mask ? field.mask : null;


								return (
									<Controller
										key={index}
										as={
											// <CustomInputMask field={field} errors={errors} />
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
