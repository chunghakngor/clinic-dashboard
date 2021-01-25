import React, { useState } from "react";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { Link } from "react-router-dom";

import useStyles from "./useStyle";
import { useDispatch } from "react-redux";

const ProtectedNavbar = ({ children }) => {
  const classes = useStyles();

  const [drawerStatus, setDrawer] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = (e: Event) => {
    e.preventDefault();
    dispatch({ type: "AUTH/LOGOUT" });
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerStatus,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={setDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerStatus,
            })}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerStatus,
          [classes.drawerClose]: !drawerStatus,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerStatus,
            [classes.drawerClose]: !drawerStatus,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton
            onClick={() => {
              setDrawer(!drawerStatus);
            }}>
            {drawerStatus ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <DrawerList handleLogOut={handleLogOut} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

const DrawerList = ({ handleLogOut }) => {
  return (
    <React.Fragment>
      <Divider />
      <List>
        <Link to="/account">
          <ListItem button key="Account">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/search">
          <ListItem button key="Search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </Link>

        <Link to="/dashboard">
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        <Link to="/report">
          <ListItem button key="Report">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>
        </Link>

        <Link to="/analytics">
          <ListItem button key="Analytics">
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </Link>
      </List>

      <Divider />
      <List>
        <ListItem button key="Setting">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItem>

        <ListItem button key="Logout" onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default ProtectedNavbar;