import React from "react";
import Helmet from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

import { Report, Search, Account, Landing, Error404, Dashboard, Analytics } from "./pages";

import LoginForm from "./components/LoginForm";
import Loading from "./components/Loading";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  const { isLoading } = useSelector((state: RootState): any => state.authReducer);

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
