import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
	Container,

	Grid,
} from "@material-ui/core";
import LowStockProducts from "./components/low-stock-products";
import DebtsCalendar from "./components/debts-calendar";

const Dashborad = ({loading, onClick, dashboard, handlerDebtDatePay }) => {
	return (
		<Container maxWidth={false}>
			<Grid container spacing={3}>
				<Grid item lg={3} sm={4} xl={3} xs={12}>
					<LowStockProducts data={dashboard?.products} />
				</Grid>
				<Grid item lg={9} sm={8} xl={9} xs={12}>
					<DebtsCalendar handlerDebtDatePay={handlerDebtDatePay} events={dashboard?.debtPayments}/>
				</Grid>
				{/*</Grid>*/}
			</Grid>
		</Container>
	);
}


Dashborad.propTypes = {
	word: PropTypes.string,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
};

export default Dashborad;

