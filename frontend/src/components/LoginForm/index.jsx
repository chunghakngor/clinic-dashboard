import React, { useReducer, useEffect } from "react";

import { Redirect } from "react-router-dom";
import { Grid, Button, Paper, InputLabel, Container, Input, InputAdornment, Avatar, Typography } from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import reducer from "./loginReducer";
import initState from "./initState";

import { useAuth } from "../../utils/AuthContext";

const LoginForm = () => {
	const [state, dispatch] = useReducer(reducer, initState);
	const { username, password, isLoading, isError, message } = state;

	const { isAuth, setAuth } = useAuth();

	useEffect(() => {
		document.title = "React Clinic | Login";
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: "LOADING" });
		fetch("http://localhost:4000/auth/login", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					document.cookie = `access_token=${data.token}`;
					dispatch({ type: "SUCESS", value: data.message });
					setAuth(true, { username: data.username, userID: data.userID });
				} else {
					dispatch({ type: "ERROR", value: data.message });
				}
			})
			.catch((err) => {
				dispatch({ type: "ERROR", value: "Something has gone wrong!" });
			});
	};

	return (
		<Container fluid>
			<Grid container direction="row" justify="space-around" alignItems="stretch" style={{ height: "100vh" }}>
				{isAuth && <Redirect push to="/dashboard" />}
				<Grid item xs={1}></Grid>
				<Grid container item xs={10} justify="center" direction="row" spacing={2} style={{ margin: "auto" }}>
					<Grid item></Grid>
					<Grid item xs={12} sm={10} md={6}>
						<form onSubmit={handleSubmit} autoComplete="off">
							<Paper elevation={3}>
								<Grid item container direction="column" justify="center" alignItems="center">
									<Grid item style={{ padding: "2em" }}>
										<Avatar>RC</Avatar>
									</Grid>
									<Grid item>
										<Typography variant="h5" gutterBottom>
											React Clinic
										</Typography>
									</Grid>
								</Grid>
								<Grid item style={{ margin: "2em" }}>
									{isError && <Alert severity="error">{message}</Alert>}
								</Grid>
								<Grid item style={{ margin: "2em" }}>
									<InputLabel htmlFor="username">Username</InputLabel>
									<Input
										fullWidth
										required
										id="username"
										placeholder="Enter a username"
										value={username}
										onChange={(e) => dispatch({ type: "SET", target: "username", value: e.target.value })}
										startAdornment={
											<InputAdornment position="start">
												<AccountCircle />
											</InputAdornment>
										}
									/>
								</Grid>
								<Grid item style={{ margin: "2em" }}>
									<InputLabel htmlFor="password">Password</InputLabel>
									<Input
										fullWidth
										required
										id="password"
										placeholder="Password"
										type="password"
										value={password}
										onChange={(e) => dispatch({ type: "SET", target: "password", value: e.target.value })}
										startAdornment={
											<InputAdornment position="start">
												<Lock />
											</InputAdornment>
										}
									/>
								</Grid>
								<Grid container item direction="row" justify="space-evenly" style={{ paddingBottom: "1em" }}>
									<Grid item>
										<Button varient="sucess" type="submit" disabled={isLoading}>
											Login
										</Button>
									</Grid>
									<Grid item>
										<Button variant="secondary" href="/" disabled={isLoading}>
											Back
										</Button>
									</Grid>
								</Grid>
							</Paper>
						</form>
					</Grid>
					<Grid item></Grid>
				</Grid>
				<Grid item xs={1}></Grid>
			</Grid>
		</Container>
	);
};

export default LoginForm;
