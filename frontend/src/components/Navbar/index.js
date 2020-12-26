import React from "react";

import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Link } from "react-router-dom";

import { useAuth } from "../../utils/AuthContext";

const Navbar = ({ children }) => {
	return (
		<Grid container direction="column" justify="flex-start" alignItems="center">
			<Grid item style={{ width: "100%" }}>
				<AppBar position="static">
					<Toolbar>
						<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
							<Grid item xs={10}>
								<Typography variant="h6">
									<LocalHospitalIcon />
									<span> React Clinic </span>
								</Typography>
							</Grid>
							<AuthLogic />
						</Grid>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid item style={{ paddingTop: "2em", width: "100%" }}>
				<div>{children}</div>
			</Grid>
		</Grid>
	);
};

const AuthLogic = () => {
	const { isAuth, setAuth } = useAuth();

	const handleLogOut = (e) => {
		e.preventDefault();
		setAuth(false, {});
	};

	return (
		<React.Fragment>
			{!isAuth && <UnAuthorised />}
			{isAuth && <Authorised handleLogOut={handleLogOut} />}
		</React.Fragment>
	);
};

const UnAuthorised = () => {
	return (
		<React.Fragment>
			<Grid item xs={1}></Grid>
			<Grid item xs={1}>
				<Link to="/login">
					<Typography style={{ color: "white" }} variant="h6">
						Login
					</Typography>
				</Link>
			</Grid>
		</React.Fragment>
	);
};

const Authorised = ({ handleLogOut }) => {
	return (
		<React.Fragment>
			<Grid item>
				<Link to="/dashboard">
					<Typography style={{ color: "white" }} variant="h6">
						Dashboard
					</Typography>
				</Link>
			</Grid>
			<Grid item>
				<Link to="/account">
					<Typography style={{ color: "white" }} variant="h6">
						Account
					</Typography>
				</Link>
			</Grid>
			<Grid item>
				<ExitToAppIcon style={{ color: "white" }} onClick={handleLogOut} />
			</Grid>
		</React.Fragment>
	);
};

export default Navbar;
