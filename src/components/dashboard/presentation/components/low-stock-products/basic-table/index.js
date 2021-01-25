import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {orange, red, yellow} from "@material-ui/core/colors";


export default function BasicTable({data, columns}) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}  className={classes.tableContainer} >
            <Table className={classes.table} stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map((column, i) => (<TableCell className={classes.bold}>{column.label}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row,i) => {
                        let low = true;
                        if (parseFloat(row.minStock) < parseFloat(row.qty))
                            low = false;

                        return (
                            <TableRow key={i} className={low ? classes.redRow : classes.yellowRow}>
                                {columns.map((column, i) => {
                                    if(column?.customRenderValue)
                                        return (<TableCell>{column.customRenderValue(row[column.name])}</TableCell>)
                                    return (<TableCell className={low ? classes.redRow : classes.yellowRow}>{row[column.name]}</TableCell>)
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
    tableContainer: {
        maxHeight: 600,
        overflow: 'auto'
    },
    bold:{
        fontWeight: 'bold'
    },
    yellowRow: {
        color: orange.A700,
    },
    redRow: {
        color: red.A700,
    }
});
