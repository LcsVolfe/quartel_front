import React from 'react';
import BasicTable from "./basic-table";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";

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
		<Box>
			<h2>Estoque baixo</h2>
			<BasicTable columns={columns} data={data} />
		</Box>
	);
};


export default LowStockProducts;
