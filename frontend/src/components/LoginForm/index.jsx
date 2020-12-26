import React, { useReducer, useEffect } from "react";

import { Redirect } from "react-router-dom";

import { Grid, Button, Paper, Container, Input, InputAdornment, Avatar, Typography } from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

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
    <div style={{ backgroundColor: "#eeeeee", height: "100vh" }}>
      <Container>
        {isAuth && <Redirect push to="/dashboard" />}
        <Grid container direction="row" justify="space-around" alignItems="stretch" style={{ height: "100vh" }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} container direction="row" justify="center" style={{ margin: "auto" }}>
            <Grid item xs={12} sm={10} md={6}>
              <form onSubmit={handleSubmit} autoComplete="off">
                <Paper elevation={10} style={{ borderRadius: "1em" }}>
                  {/* Top */}
                  <Grid item container direction="column" justify="center" alignItems="center">
                    <Grid item style={{ padding: "2em" }}>
                      <Avatar style={{ height: "3em", width: "3em", fontSize: "2em" }} variant="rounded" />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        Login to React Clinic
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item style={{ margin: "2em" }}>
                    {isError && (
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {message}
                      </Alert>
                    )}
                  </Grid>
                  {/* Input Username/Password */}
                  <Grid item style={{ margin: "2em" }}>
                    <Input
                      fullWidth
                      required
                      placeholder="Username"
                      value={username}
                      onChange={(e) => dispatch({ type: "SET", target: "username", value: e.target.value })}
                      style={{ padding: "0.5em" }}
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item style={{ margin: "2em" }}>
                    <Input
                      fullWidth
                      required
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => dispatch({ type: "SET", target: "password", value: e.target.value })}
                      style={{ padding: "0.5em" }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  {/* Login/Back */}
                  <Grid container item direction="row" justify="space-evenly" style={{ padding: "2em" }}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                        style={{ padding: "1em", width: "7em", borderRadius: "1em" }}>
                        Login
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        href="/"
                        disabled={isLoading}
                        style={{ padding: "1em", width: "7em", borderRadius: "1em" }}>
                        Back
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginForm;
