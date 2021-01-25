import React from "react";
import { Route, Redirect } from "react-router-dom";

import Helmet from "react-helmet";
import ProtectedNavbar from "../components/ProtectedNavbar";
import { RootState } from "../redux/reducers";

import { useSelector } from "react-redux";

interface ProtectedRouteInterface {
  component: JSX.Element;
  title: string;
  path: string;
}

const ProtectedRoute = ({ component, title, path, ...rest }: ProtectedRouteInterface) => {
  const { isAuth } = useSelector((state: RootState) => state.authReducer);

  return (
    <Route
      path={path}
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
