import React from 'react';
import BasicTable from "./basic-table";
import {Grid} from "@material-ui/core";

const LowStockProducts = ({ data }) => {

	let columns = [
		{
			name: 'name',
			label: 'Produto',
		},
		{
			name: 'qty',
			label: 'Em Estoque',
		},
		{
			name: 'minStock',
			label: 'Qtd. minima',
			// customRenderValue: InfoColumn
		},
		// {
		// 	name: 'puchaseDate',
		// 	label: 'Última Compra',
		// 	customRenderValue: DateColumn
		// },
	]
	return (
		<BasicTable columns={columns} data={data} />
	);
};


export default LowStockProducts;
