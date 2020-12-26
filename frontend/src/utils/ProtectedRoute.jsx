import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./AuthContext";
import ProtectedNavbar from "../components/ProtectedNavbar";

const ProtectedRoute = ({ component, ...rest }) => {
	const { isAuth } = useAuth();

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					<ProtectedNavbar>{component}</ProtectedNavbar>
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
