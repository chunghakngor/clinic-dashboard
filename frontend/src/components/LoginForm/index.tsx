import React, { useEffect } from "react";

import { Redirect } from "react-router-dom";

import { Grid, Button, Paper, Container, Input, InputAdornment, Avatar, Typography, makeStyles } from "@material-ui/core";
import { AccountCircle, Lock } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import { RootState } from "../../redux/reducers";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#eeeeee",
    height: "100vh",
  },
  fullHeight: {
    height: "100vh",
  },
  autoMargin: {
    margin: "auto",
  },
  avatar: {
    height: "3em",
    width: "3em",
    fontSize: "2em",
  },
  formPadding: {
    margin: "2em",
  },
  buttonPadding: {
    padding: "1em",
    width: "7em",
    borderRadius: "1em",
  },
  inputPadding: {
    padding: "0.5em",
  },
});

const LoginForm = () => {
  // const { username, password, isLoading, isError, message } = state;
  const { username, password, isLoading, isError, message } = useSelector((state: RootState) => state.loginReducer);
  const { isAuth } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const styles = useStyles();

  useEffect(() => {
    document.title = "React Clinic | Login";
  }, []);

  const handleSubmit = (event: Event) => {
    event.preventDefault();
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
          dispatch({ type: "LOGIN/SUCESS", payload: data.message });
          dispatch({ type: "AUTH/LOGIN", payload: { username: data.username, userID: data.userID } });
        } else {
          dispatch({ type: "LOGIN/ERROR", payload: data.message });
        }
      })
      .catch((err) => {
        dispatch({ type: "LOGIN/ERROR", payload: "Something has gone wrong!" });
      });
  };

  return (
    <div className={styles.container}>
      <Container>
        {isAuth && <Redirect push to="/dashboard" />}
        <Grid container justify="space-around" alignItems="stretch" className={styles.fullHeight}>
          <Grid item xs={1} />
          <Grid item xs={10} container justify="center" className={styles.autoMargin}>
            <Grid item xs={12} sm={10} md={6}>
              <form onSubmit={handleSubmit} autoComplete="off">
                <Paper elevation={10} style={{ borderRadius: "1em" }}>
                  {/* Top */}
                  <Grid item container direction="column" justify="center" alignItems="center">
                    <Grid item className={styles.formPadding}>
                      <Avatar className={styles.avatar} variant="rounded" />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" gutterBottom>
                        Login to React Clinic
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item className={styles.formPadding}>
                    {isError && (
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {message}
                      </Alert>
                    )}
                  </Grid>
                  {/* Input Username/Password */}
                  <Grid item className={styles.formPadding}>
                    <Input
                      fullWidth
                      required
                      placeholder="Username"
                      value={username}
                      onChange={(e) => dispatch({ type: "LOGIN/SET", target: "username", value: e.target.value })}
                      className={styles.inputPadding}
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item className={styles.formPadding}>
                    <Input
                      fullWidth
                      required
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => dispatch({ type: "LOGIN/SET", target: "password", value: e.target.value })}
                      className={styles.inputPadding}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  {/* Login/Back */}
                  <Grid container item justify="space-evenly" alignItems="center" style={{ paddingBottom: "2em" }}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                        className={styles.buttonPadding}>
                        Login
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" href="/" disabled={isLoading} className={styles.buttonPadding}>
                        Back
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Container>
    </div>
  );
};

export default LoginForm;
