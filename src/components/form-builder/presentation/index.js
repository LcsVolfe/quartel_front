import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import {
	AppBar, CircularProgress, FormControl,
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
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Autocomplete from "@material-ui/lab/Autocomplete";
import {setCompleteOption} from "../reducer";




const FormBuilderPresentation = ({ controls, onSubmit, title, isColumn, elevation, autoCompleteOption, onSubmitForm, onExit, handleAutoCompleteChange, dispatch }) => {
	let location = useLocation();
	const classes = useStyles();
	let fieldsState = {};
	let autoCompleteOpenState = {};


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

			if(field.type === typesEnum.AUTOCOMPLETE)
				autoCompleteOpenState[field.name] = {open: false, loading: false};

			fieldsState[field.name] = value;
			// setFormState(field.name, value)
		});
	}
	checkControls(onSubmitForm)
	const [state, setState] = useState(fieldsState);
	const [autoCompleteOpen, setAutoCompleteOpen] = useState(autoCompleteOpenState);
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
			let value = data[control.name];
			let newValue;
			switch (control.type){
				case typesEnum.CURRENCY:
					// console.log(String(value))
					newValue = String(value).replaceAll(' ', '').replace(',', '.');
					// console.log(newValue)
					data[control.name] = newValue;
					break;

				case typesEnum.CPF:
				case typesEnum.CNPJ:
				case typesEnum.ZIPCODE:
				case typesEnum.PHONE:
					newValue = String(value).replace(/[^0-9]/g, '');
					data[control.name] = newValue;
					break;

				case typesEnum.MULTISELECT:
					if(value.length)
						newValue = value.map(item=>Number(item.id));
					data[control.name] = newValue
					break;

				default: break;
			}
		});
		console.log(data)
		onSubmit(data, action);
	}
	const updateAutoComplete = (open, loading= false, name) => setAutoCompleteOpen({
		...autoCompleteOpen,
		[name]:
			{
				open: open,
				loading: loading,
				// loading: autoCompleteOpen[field.name]?.loading,
			}
	});
	useEffect(()=>{
		let stateToUpdate = {...autoCompleteOpen};
		for(let item in stateToUpdate)
			if(stateToUpdate[item].open)
				stateToUpdate[item].loading = autoCompleteOption.loading;
		setAutoCompleteOpen(stateToUpdate)
	}, [autoCompleteOption])

	const onError = (errors, e) => console.log(errors, e);
	return (
		<Paper className={classes.paper}>
			<Box p={4} className={classes.box}>
				<h1>{title}</h1>

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

							case typesEnum.AUTOCOMPLETE:

								// console.log(autoCompleteOpen[field.name]?.loading, autoCompleteOption)
								return (
									<Autocomplete
										key={index}
										open={autoCompleteOpen[field.name]?.open}
										onOpen={() => updateAutoComplete(true, false, field.name)}
										onClose={() => updateAutoComplete(false, false, field.name)}
										onChange={(event, value) => {
											setFormState(field.name, value?.id);
											dispatch(setCompleteOption({data: [], loading: true}))
										}}
										value={state[field.name]}
										getOptionLabel={(option) => option.name}
										options={autoCompleteOption.data}
										loading={autoCompleteOpen[field.name]?.loading && autoCompleteOption.data.length==0}
										onInputChange={((event, value) => {
											if(event.type != 'change') return;
											updateAutoComplete(true, true, field.name)
											handleAutoCompleteChange(value, field.path)
										})}
										renderInput={(params) => (
											<TextField
												{...params}
												label={field?.label || field.name}
												name={field.name}
												InputProps={{
													...params.InputProps,
													endAdornment: (
														<>
															{autoCompleteOpen[field.name]?.loading && autoCompleteOption.data.length==0 ? <CircularProgress color="inherit" size={20} /> : null}
															{params.InputProps.endAdornment}
														</>
													),
												}}
											/>
										)}
									/>
								);

							case typesEnum.MULTISELECT:
								return (<MultiSelectComponent
									{...field}
									key={index}
									onResult={multiListUpdate}
									handleAutoCompleteChange={handleAutoCompleteChange}
									autoCompleteOption={autoCompleteOption}
									dispatch={dispatch}
								/>);

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

							case typesEnum.INVISIBLE:
								return;

							default:
								return <span key={field.name}>Elemento não encontrado. {field.name}</span>
						}
					})}

				</form>


			</Box>
		</Paper>
	);
}

FormBuilderPresentation.propTypes = {
	controls: PropTypes.array,
	onSubmit: PropTypes.func,
	loading: PropTypes.bool,
	isColumn: PropTypes.bool,
	title: PropTypes.string,
	elevation: PropTypes.number,
};



export default FormBuilderPresentation;



const useStyles = makeStyles((theme) => ({
	form: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
		display: 'flex',
		flexWrap: 'wrap',
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
