import React from "react";

import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

const useStyles = makeStyles({
  fullWidth: {
    width: "100%",
  },
  childrenContainer: {
    paddingTop: "2em",
    width: "100%",
  },
  whiteFont: {
    color: "white",
  },
});

interface NavBarInterface {
  children: JSX.Element;
}

const Navbar = ({ children }: NavBarInterface) => {
  const styles = useStyles();

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Grid item className={styles.fullWidth}>
        <AppBar position="static">
          <Toolbar>
            <Grid container justify="flex-start" alignItems="flex-start" spacing={2}>
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
      <Grid item className={styles.childrenContainer}>
        <div>{children}</div>
      </Grid>
    </Grid>
  );
};

const AuthLogic = () => {
  const { isAuth } = useSelector((state: RootState): any => state.authReducer);
  const dispatch = useDispatch();

  const handleLogOut = (event: Event) => {
    event.preventDefault();
    dispatch({ type: "AUTH/LOGOUT" });
  };

  return <React.Fragment>{isAuth ? <Authorised handleLogOut={handleLogOut} /> : <UnAuthorised />}</React.Fragment>;
};

const UnAuthorised = () => {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={1} />
      <Grid item xs={1}>
        <Link to="/login">
          <Typography className={styles.whiteFont} variant="h6">
            Login
          </Typography>
        </Link>
      </Grid>
    </React.Fragment>
  );
};

const Authorised = ({ handleLogOut }: any) => {
  const styles = useStyles();

  return (
    <React.Fragment>
      <Grid item>
        <Link to="/dashboard">
          <Typography className={styles.whiteFont} variant="h6">
            Dashboard
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/account">
          <Typography className={styles.whiteFont} variant="h6">
            Account
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <ExitToAppIcon className={styles.whiteFont} onClick={handleLogOut} />
      </Grid>
    </React.Fragment>
  );
};

export default Navbar;
