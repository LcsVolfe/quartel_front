import React from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	IconButton,
	Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useLocation} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MUIDataTable from "mui-datatables";

const TableRender = ({ options, title, isColumn, columns, onLoadTable, loading }) => {
	const classes = useStyles();
	let location = useLocation();

	let optionsDefalut = {...optionsLanguage, ...options}
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
					title={title || ''}
					data={onLoadTable || []}
					columns={columns}
					options={optionsDefalut}
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
