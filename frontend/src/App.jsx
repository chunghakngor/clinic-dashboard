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

import LoginForm from "./components/LoginForm";

import { useAuth } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  const { isLoading } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isLoading ? <Loading /> : <Landing />}
        </Route>

        <Route path="/login">
          <LoginForm />
        </Route>

        <ProtectedRoute path="/account" component={<Account />} />
        <ProtectedRoute path="/search" component={<Search />} />
        <ProtectedRoute path="/dashboard" component={<Dashboard />} />
        <ProtectedRoute path="/report" component={<Report />} />
        <ProtectedRoute path="/analytics" component={<Analytics />} />

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
