import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	IconButton, Switch,
	Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useLocation} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";
import StringMask from "string-mask";
import CustomToolbarSelect from "./toolbar-select";
import {ToDecimal} from "../../../utils/number";
import {FormatDate} from "../../../utils/date";



export const BooleanColumn = (value) => (<Switch checked={value} color={'primary'}/>);
export const CurrencyColumn = (value) => (<span>R$ {ToDecimal(value)}</span>);
export const NumberColumn = (value) => ToDecimal(value);
export const DateColumn = (value) => FormatDate(value);
export const MaskColumn = (value, mask) => (<span >{new StringMask(mask).apply(value)}</span>);
export const OptionsColumn = (value, options) => (<span>{options.filter(op=>op.value === value)[0]?.label}</span>);

const TableRender = ({ options, title, columns, onLoadTable, loading, deleteItem, history }) => {
	const classes = useStyles();
	const rowsSelected = useState([]);
	let location = useLocation();

	let optionsDefalut = {
		...optionsLanguage,
		...options,
		rowsSelected,
		selectableRowsOnClick: true,
		customToolbarSelect: (selectedRows) =>
			<CustomToolbarSelect selectedRows={selectedRows} data={onLoadTable} deleteItem={deleteItem} history={history}/>
	}

	return (
		<>
			{loading ? false : <>
				<AppBar position="relative">
					<Toolbar className={classes.appBar}>
						<IconButton color="inherit" component={Link} to={location.pathname.replace('list', 'form')}>
							<AddIcon />
						</IconButton>
					</Toolbar>
				</AppBar>

				<MUIDataTable
					title={title}
					data={onLoadTable || []}
					columns={columns}
					options={optionsDefalut}
					components={{
						Boolean
					}}
				/>
			</>}
		</>
	);
};

TableRender.propTypes = {
	controls: PropTypes.array,
	onSubmit: PropTypes.func,
	loading: PropTypes.bool,
	isColumn: PropTypes.bool,
	title: PropTypes.string,
	elevation: PropTypes.number,
};

export default TableRender;

const useStyles = makeStyles((theme) => ({
	appBar: {
		display: 'flex',
		justifyContent: 'flex-end'
	}

}));


const optionsLanguage = {
	filterType: 'checkbox',
	textLabels: {
		body: {
			noMatch: "Desculpe, nenhum registro correspondente encontrado",
			toolTip: "Ordenar",
			columnHeaderTooltip: column => `Ordenar por ${column.label}`
		},
		pagination: {
			next: "Próxima página",
			previous: "Página anterior",
			rowsPerPage: "Linhas por página:",
			displayRows: "de",
		},
		toolbar: {
			search: "Buscar",
			downloadCsv: "Download CSV",
			print: "Imprimir",
			viewColumns: "Columnas",
			filterTable: "Filtros",
		},
		filter: {
			all: "Tudo",
			title: "FILTROS",
			reset: "RESET",
		},
		viewColumns: {
			title: "Mostrar Colunas",
			titleAria: "Mostrar/Esconder Columna",
		},
		selectedRows: {
			text: "Linha(s) selecionada",
			delete: "Deletar",
			deleteAria: "Deletar linhas selecionadas",
		},
	}
};
