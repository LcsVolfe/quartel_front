import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	Container,

	Grid,
} from "@material-ui/core";
import PStypesEnum from "../../form-builder/enum/types.enum";
import {FormBuilder} from "../../form-builder";

const OrderCalculate = ({loading, onClick, orderCalculate }) => {
	console.log(orderCalculate)
	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item xl={4} xs={4} lg={4}>
					<FormBuilder
						onClick={onClick}
						actionBar={false}
						btnText={'Filtrar'}
						elevation={0}
						inputFullWidth={true}
						controls={[
							{label: 'Obra', name: 'order', type: PStypesEnum.AUTOCOMPLETE, path: 'orders-search-by-name'},
							{label: 'Funcionário', name: 'employee', type: PStypesEnum.AUTOCOMPLETE, path: 'employees-search-by-name'},
						]}
					/>
				</Grid>
				<Grid item>
					Total da ordem: R$ {orderCalculate?.total_order}
					Total de funcionarios {orderCalculate?.total_order}
				</Grid>
			</Grid>
		</Container>
	);
}


OrderCalculate.propTypes = {
	word: PropTypes.string,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
};

export default OrderCalculate;

