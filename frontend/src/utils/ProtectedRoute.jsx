import React from "react";
import { Route, Redirect } from "react-router-dom";

import Helmet from "react-helmet";

import { useAuth } from "./AuthContext";
import ProtectedNavbar from "../components/ProtectedNavbar";

const ProtectedRoute = ({ component, title, ...rest }) => {
  const { isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          <React.Fragment>
            <Helmet title={`React Clinic | ${title}`} />
            <ProtectedNavbar>{component}</ProtectedNavbar>
          </React.Fragment>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
