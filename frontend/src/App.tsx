import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Report from "./pages/Report";
import Search from "./pages/Search";
import Account from "./pages/Account";
import Loading from "./components/Loading";
import Landing from "./pages/Landing";
import Error404 from "./pages/Error404";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

import Helmet from "react-helmet";

import LoginForm from "./components/LoginForm";

import { useSelector } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute";
import { RootState } from "./redux/reducers";

const App = () => {
  const { isLoading } = useSelector((state: RootState) => state.authReducer);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Helmet title="React Clinic" />
          {isLoading ? <Loading /> : <Landing />}
        </Route>

        <Route path="/login">
          <Helmet title="React Clinic | Login" />
          <LoginForm />
        </Route>

        <ProtectedRoute path="/account" component={<Account />} title={"Account"} />
        <ProtectedRoute path="/search" component={<Search />} title={"Search"} />
        <ProtectedRoute path="/dashboard" component={<Dashboard />} title={"Dashboard"} />
        <ProtectedRoute path="/report" component={<Report />} title={"Report"} />
        <ProtectedRoute path="/analytics" component={<Analytics />} title={"Analytics"} />

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
