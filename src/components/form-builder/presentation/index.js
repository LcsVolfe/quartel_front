import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Controller, useForm, useWatch} from 'react-hook-form';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import {
	AppBar, Button, CircularProgress, Container, FormControl,
	Grid, IconButton, InputLabel,
	MenuItem,
	Paper,
	Select, Toolbar, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import typesEnum from '../enum/types.enum';
import Box from '@material-ui/core/Box';
import {Link, useLocation} from "react-router-dom";
import Dropzone, {useDropzone} from 'react-dropzone'
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import {ptBR} from "date-fns/locale";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MultiSelectComponent from "./multi-select";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Autocomplete from "@material-ui/lab/Autocomplete";
import {setCompleteOption} from "../reducer";
import ToolBarActions from "./toolbar-actions";


const FormBuilderPresentation = ({
		 controls, onSubmit, title, isColumn, elevation, autoCompleteOption, TakeFormReference, saveBtn=true, inputFullWidth=false,
		 onSubmitForm, onExit, handleAutoCompleteChange, dispatch, actionBar=[], onClick, btnText, btnJustify, submitFormByBtnClick=false }) => {
	const FORM_ID = Math.random();
	const location = useLocation();
	const classes = useStyles();
	let fieldsState = {};
	let autoCompleteOpenState = {};

	const checkControls = (onSubmitForm) => {
		controls.forEach(field => {
			let value;
			if(onSubmitForm?.id || field.defaultValue ||(field.type === typesEnum.BOOLEAN))
				value = onSubmitForm?.id ? onSubmitForm[field.name] :
					field.defaultValue ? field.defaultValue : false;

			else if(field.type === typesEnum.DATE)
				value = 'defaultValue' in field ? field.defaultValue : new Date();

			else if(field.type === typesEnum.AUTOCOMPLETE)
				autoCompleteOpenState[field.name] = {open: false, loading: false};

			else if(field.type === typesEnum.MULTISELECT)
				value = onSubmitForm[field.name] || [];

			else if(field.type === typesEnum.SELECT)
				value = field?.defaultValue || 0;

			else if(field.type === typesEnum.CURRENCY)
				value = field?.defaultValue || '0';


			fieldsState[field.name] = value;
			// setFormState(field.name, value)
		});
		if(onSubmitForm?.id)
			fieldsState.id = onSubmitForm.id;
		// console.log(fieldsState)
	}
	checkControls(onSubmitForm)
	const [state, setState] = useState(fieldsState);
	const [autoCompleteOpen, setAutoCompleteOpen] = useState(autoCompleteOpenState);
	const { register, handleSubmit, control, errors, setValue, watch, trigger } = useForm({defaultValues: fieldsState});
	const watchForm = useWatch({control});
	const {acceptedFiles, getRootProps, getInputProps} = useDropzone({multiple: false});

	const multiListUpdate = (data, name) => setFormState(name, data);
	const handleChangeSwitch = (event) => setFormState(event.target.name, event.target.checked);
	const handleChangeSelect = (event) => setFormState(event.target.name, event.target.value)
	const handleDateChange = (date, value, name) => setFormState(name, date);


	const setFormState = (name, value) => {
		if(state[name] == value) return;
		setValue(name, value)
		setState({ ...state, [name]: value });
	}

	const defineTypeAction = (action=1, event) => {
		console.log('defineTypeAction')
		action = 1;
		if(TakeFormReference)
			TakeFormReference({watchForm, state}, setFormState)
		let data = {...state, ...watch()};
		if(onSubmitForm?.id)
			data = {id: onSubmitForm.id, ...data}
		controls.map(control => {
			let value = data[control.name];
			let newValue;
			switch (control.type){
				case typesEnum.CURRENCY:
					newValue = String(value).replaceAll(' ', '').replace(',', '.');
					data[control.name] = newValue;
					break;

				case typesEnum.DATE:
					data[control.name] = state[control.name];
					break;

				case typesEnum.CPF:
				case typesEnum.CNPJ:
				case typesEnum.ZIPCODE:
				case typesEnum.PHONE:
					newValue = String(value).replace(/[^0-9]/g, '');
					data[control.name] = newValue;
					break;

				case typesEnum.MULTISELECT:
					if(control?.customComponent) break;
					if(value?.length > 0)
						if(control.additionalFields)
							newValue = value
						else
							newValue = value.map(item=>Number(item.id));
					data[control.name] = newValue || []
					break;

				case typesEnum.AUTOCOMPLETE:
				case typesEnum.INVISIBLE:
					data[control.name] = state[control.name]?.id || state[control.name]
					break;

				case typesEnum.DROPZONE:
					data[control.name] = acceptedFiles;

					var formData = new FormData();
					formData.append('document', acceptedFiles[0]);

					// fetch('http://api.mocki.io/v1/7bafd03f', {
					fetch('http://127.0.0.1:8000/debt-payments/'+state?.id+'/', {
						method: 'PUT',
						headers:{
							Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE1NTA5NjQxLCJqdGkiOiJmMDU2YzU4ZWYwNjY0MTlmYmM2ZGI1ZTYzYjgyOGUwMSIsInVzZXJfaWQiOjR9.WY0-xv9Zw0NwQvZVx7WBGtzXr0_9hVsWRToyVK1Y5kU'
						},
						body: formData
					})

					break;

				default: break;
			}
		});
		// console.log(data)
		if(onSubmit)
			onSubmit(data, action);
		// if(onClick)
		// 	onClick(data);
		return data
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

	useEffect(()=>{
		// console.log(TakeFormReference)
		// console.log(TakeFormReference)
		if(TakeFormReference){
			// console.log(watchForm, state)
			TakeFormReference({watchForm, state}, setFormState)
		}
	}, [watchForm, state])

	const onError = (errors, e) => console.log(errors, e);

	// console.log(watchForm)
	return (
		<Paper className={classes.paper} elevation={elevation}>
			<Box p={actionBar ? 4 : 0} className={classes.w100}>
				<h1>{title}</h1>
				{actionBar && <ToolBarActions onExit={onExit} location={location} FORM_ID={FORM_ID} actionBar={actionBar} objId={onSubmitForm?.id}/>}

				<form onSubmit={handleSubmit(defineTypeAction)} id={FORM_ID}>
					<Grid
						container
						spacing={2}
						direction={isColumn ? 'column' : 'row'}
						// justify={'center'}
						alignItems={'center'}
					>
						{/*<IsolateReRender control={control} />*/}
						{controls.map((field, index)=>{
							let componentToRender;
							let xs = 12;
							let sm = inputFullWidth ? 12 : 4;
							let lg = inputFullWidth ? 12 : 3;
							switch (field.type) {
								case typesEnum.TEXT:
								case typesEnum.NUMBER:
								case typesEnum.PASSWORD:
								case typesEnum.EMAIL:
									componentToRender = (
										<TextField
											className={classes.w100}
											name={field.name}
											// value={state[field.name]  || ''}
											error={!!errors[field.name]}
											label={field.label || field.name}
											type={field.type}
											inputRef={register(field?.validations)}
											helperText={errors[field.name]?.message}
											disabled={field.readOnly}
											onChange={(event) => setFormState(event.target.name, event.target.value)}
										/>
									);
									break;

								case typesEnum.SELECT:
									field.options = field?.options || [{label: 'Defina as opções', value: 0}]
									componentToRender = (
										<FormControl  className={classes.w100}>
											<InputLabel id={field.name}>{field.label}</InputLabel>
											<Select
												labelId={field.name}
												label={field.label || field.name}
												name={field.name}
												value={state[field.name]}
												// inputRef={register(field?.validations)}
												onChange={handleChangeSelect}
											>
												{field.options.map((item, i) => {
													return (<MenuItem key={i} value={item.value}>{item.label}</MenuItem>)
												})}
											</Select>
										</FormControl>
									);
									break

								case typesEnum.BOOLEAN:
									componentToRender = (
										<Box  className={classes.boolean}>
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
									break;

								case typesEnum.AUTOCOMPLETE:
									// console.log(autoCompleteOpen[field.name]?.loading, autoCompleteOption)
									componentToRender = (
										// <Controller
										// 	name={field.name}
										// 	control={control}
										// 	rules={{validate: (value) => field?.validations?.rule ? field.validations.rule(value) : null}}
										// 	as={()}
										// />
										<Autocomplete
											className={classes.w100}
											open={autoCompleteOpen[field.name]?.open}
											onOpen={() => updateAutoComplete(true, false, field.name)}
											onClose={() => updateAutoComplete(false, false, field.name)}
											onChange={(event, value) => {
												setFormState(field.name, value);
												dispatch(setCompleteOption({data: [], loading: true}))
											}}
											noOptionsText={'Sem opções'}
											value={state[field.name]}
											getOptionLabel={(option) => option.name}
											options={autoCompleteOption?.data}
											loading={autoCompleteOpen[field.name]?.loading && autoCompleteOption.data.length==0}
											onInputChange={((event, value) => {
												if(event?.type != 'change') return;
												updateAutoComplete(true, true, field.name)
												handleAutoCompleteChange(value, field.path)
											})}
											renderInput={(params) => (
												<TextField
													{...params}
													// inputRef={register(field?.validations)}
													label={field?.label || field.name}
													name={field.name}
													error={!!errors[field.name]}
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
									break;

								case typesEnum.MULTISELECT:
									xs = 12;
									sm = 12;
									lg = 12;
									if (field?.customComponent)
										componentToRender = field.customComponent;
									else
										componentToRender = (<MultiSelectComponent
											{...field}
											className={classes.w100}
											initValue={onSubmitForm[field.name]}
											onResult={multiListUpdate}
											handleAutoCompleteChange={handleAutoCompleteChange}
											autoCompleteOption={autoCompleteOption}
											dispatch={dispatch}
											setFormState={setFormState}
											TakeFormReference={TakeFormReference}
											watchForm={watchForm}
										/>);
									break;

								case typesEnum.DATE:
									componentToRender = (
										<MuiPickersUtilsProvider  utils={DateFnsUtils} locale={ptBR}>
											<KeyboardDatePicker
												// clearable={true}
												disabled={field.readOnly}
												className={classes.w100}
												variant={'inline'}
												format="dd/MM/yyyy"
												label={field.label || field.name}
												value={state[field.name]}
												onChange={(date, value) => handleDateChange(date, value, field.name)}
											/>
										</MuiPickersUtilsProvider >
									);
									break;

								case typesEnum.CURRENCY:
									componentToRender = (
										<CurrencyTextField
											label={field.label || field.name}
											className={classes.w100}
											currencySymbol="R$ "
											value={state[field.name]}
											outputFormat={"number"}
											decimalCharacter=","
											// inputRef={register(field?.validations)}
											digitGroupSeparator=" "
											disabled={field.readOnly}
											helperText={errors[field.name]?.message}
											onChange={(event, value)=> setFormState(field.name, value)}
										/>
									);
									break;

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


									componentToRender = (
										<Controller
											as={
												// <CustomInputMask field={field} errors={errors} />
												<InputMask mask={maskPatter} >
													{() => (
														<TextField
															error={!!errors[field.name]}
															name={field.name}
															label={field.label ||field.name}
															helperText={errors[field.name]?.message}
															className={classes.w100}
														/>
													)}
												</InputMask>
											}
											control={control}
											name={field.name}
											rules={{validate: (value) => field?.validations?.rule ? field.validations.rule(value) : null}}
										/>
									);
									break

								case typesEnum.DROPZONE:
									let dropText = 'Clique ou arraste um arquivo.';
									const files = acceptedFiles.map((file, i) => {
										if(i===0)
											dropText = file.path;
										return (
											<li key={file.path}>
												{file.path} - {file.size} bytes
											</li>
										)
									});
									componentToRender = (
										<Box>
											<Typography color={'textSecondary'}>{field.label}</Typography>
											<Box border={'1px dashed'} p={2} borderRadius={8} {...getRootProps({className: 'dropzone'})}>
												<input {...getInputProps()} />
												<Typography component={'p'} align={'center'}>{dropText}</Typography>
											</Box>
											{/*<aside>*/}
											{/*	<h4>Files</h4>*/}
											{/*	<ul>{files}</ul>*/}
											{/*</aside>*/}
										</Box>
									);
									break;

								case typesEnum.INVISIBLE:
									return;

								default:
									return <span key={field.name}>Elemento não encontrado. {field.name}</span>
							}

							return (
								<Grid key={index} item xs={xs} sm={sm} lg={lg} className={classes.w100}>
								{/*<Grid item xs={12} sm={6} lg={4} xl={3}>*/}
									{componentToRender}
								</Grid>
							);
						})}

					</Grid>
					{!actionBar && saveBtn && <Grid container justify={btnJustify ? 'center' : 'flex-end'}>
						<Button
							className={classes.mButton}
							fullWidth
							type={submitFormByBtnClick ? 'submit' : 'click'}
							form={submitFormByBtnClick ? FORM_ID : ''}
							color={'primary'}
							variant={'contained'}
							onClick={()=>onClick(defineTypeAction())}
						>
							{btnText ? btnText : 'Adicionar'}
						</Button>
					</Grid>}
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
	paper: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		maxWidth: '1000px',
		margin: '0 auto',
	},
	boolean: {
		order: 1
	},
	w100: {
		width: '100%'
	},
	mButton: {
		marginTop: 16,
		marginBottom: 16,
	}
}));
