import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
	Avatar,
	Card,
	CardContent,
	Grid,
	Typography,
	makeStyles,
	colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {ToDecimal} from "../../../utils/number";

const useStyles = makeStyles(() => ({
	root: {
		height: '100%'
	},
	avatar: {
		backgroundColor: colors.indigo[600],
		height: 56,
		width: 56
	}
}));

const TotalProfit = ({ className, label, value = 0 }) => {
	const classes = useStyles();

	return (
		<Card
			className={clsx(classes.root, className)}
		>
			<CardContent>
				<Grid
					container
					justify="space-between"
					spacing={3}
				>
					<Grid item>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="h6"
						>
							{label}
						</Typography>
						<Typography
							color="textPrimary"
							variant="h4"
						>
							R$ {ToDecimal(value)}
						</Typography>
					</Grid>
					{/*<Grid item>*/}
					{/*	<Avatar className={classes.avatar}>*/}
					{/*		<AttachMoneyIcon />*/}
					{/*	</Avatar>*/}
					{/*</Grid>*/}
				</Grid>
			</CardContent>
		</Card>
	);
};

TotalProfit.propTypes = {
	className: PropTypes.string
};

export default TotalProfit;
