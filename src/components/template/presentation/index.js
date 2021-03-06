import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {AccountCircle} from "@material-ui/icons";
import {Grid, LinearProgress, Menu, MenuItem, Typography} from "@material-ui/core";
import {Link, useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";

import Logo from '../../../imgs/logo_quartel.png';
import router from "../../../AppRouter";
import TSnackbar from "./snackbar";

const drawerWidth = 240;


export default function Template({content, onPromisse, handlerSingOut}) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const openIcon = Boolean(anchorEl);
	const location = useLocation();


	// console.log(onPromisse)


	const handleMenu = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	return (
		<div className={classes.root}>
			<Helmet>
				<title>Quartel</title>
			</Helmet>

			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Link to={''}>

						<img src={Logo} className={classes.imglogo} alt={''}/>
					</Link>
					<div className={classes.marginLeftAuto}>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={openIcon}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handlerSingOut}>Logout</MenuItem>
						</Menu>
					</div>

				</Toolbar>
				{onPromisse === true ? <LinearProgress /> : null}
			</AppBar>

			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{router.map((item, index) => {
						if(item.path.includes('form')) return;
						return (
							<ListItem
								button
								key={index}
								selected={location.pathname.split('/').pop() == item.path.split('/').pop()}
								component={Link} to={item.path}>
								<ListItemIcon>
									{item.icon}
								</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						)
					})}
				</List>
			</Drawer>

			<TSnackbar {...onPromisse} />

			<main className={classes.content}>
				{content}
			</main>
			<Grid container className={classes.footer} alignItems={'center'} justify={'center'} direction={'column'}>
				<Typography  variant={'h5'}>Volfe</Typography>
				<Typography >Soluções Tecnológicas</Typography>
			</Grid>
		</div>
	);
}



const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		// [theme.breakpoints.down('xs')]: {
		// 	display: 'none'
		// },
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: theme.spacing(7),
		paddingBottom: 80
		// overflow: 'auto',
		// maxHeight: '85vh'
	},
	marginLeftAuto: {
		marginLeft: 'auto',
	},
	imglogo: {
		maxHeight: '40px',
	},
	templateLinearProgress: {
		position: 'absolute',
		width: '100vw',
		top: '64px',
		zIndex: '1200'
	},
	footer: {
		width: '100vw',
		position: 'fixed',
		bottom: 0,
		height: 70,
		maxHeight: 70,
		backgroundColor: '#2f2c39',
		zIndex: 1201,
		color: '#FFF',
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		},
	}
}));
