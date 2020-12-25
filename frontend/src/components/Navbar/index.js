import React from "react";

import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import { Link } from "react-router-dom";

const index = ({ children }) => {
	return (
		<Grid container direction="column" justify="flex-start" alignItems="center">
			<Grid item style={{ width: "100%" }}>
				<AppBar position="static">
					<Toolbar>
						<Grid container direction="row" justify="space-between" alignItems="flex-start">
							<Grid item>
								<Typography variant="h6">
									<LocalHospitalIcon />
									<span> </span>
									React Clinic
								</Typography>
							</Grid>
							<Grid item>
								<Link to="/login">
									<Typography style={{ color: "white" }} variant="h6">
										Login
									</Typography>
								</Link>
							</Grid>
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

export default index;
