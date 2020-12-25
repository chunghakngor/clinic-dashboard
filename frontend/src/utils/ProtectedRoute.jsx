import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
	const { isAuth } = useAuth();

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					children
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
