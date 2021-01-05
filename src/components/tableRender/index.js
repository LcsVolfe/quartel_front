import React from "react";
import MUIDataTable from "mui-datatables";
import {AppBar, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Link, useHistory, useLocation} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";

const TableRenderComponent = (props) => {
    console.log(props)
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();

    let optionsDefalut = {...optionsLanguage, ...props.options}

    return(
        <>
            <AppBar position="relative">
                <Toolbar className={classes.appBar}>
                    <IconButton color="inherit" component={Link} to={location.pathname.replace('list', 'form')}>
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <MUIDataTable
                title={props.title || ''}
                data={props.data || []}
                columns={props.columns}
                options={optionsDefalut}
            />
        </>

);
}


export default TableRenderComponent;

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
