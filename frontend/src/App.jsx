import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Report from "./pages/Report";
import Error404 from "./pages/Error404";
import Loading from "./components/Loading";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";

import { useAuth } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import Navbar from "./components/Navbar";
import ProtectedNavbar from "./components/ProtectedNavbar";

const App = () => {
	const { isLoading } = useAuth();

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					{isLoading ? (
						<Loading />
					) : (
						<Navbar>
							<Landing />
						</Navbar>
					)}
				</Route>
				<Route path="/login">
					<LoginForm />
				</Route>
				<ProtectedRoute path="/dashboard">
					<ProtectedNavbar>
						<Dashboard />
					</ProtectedNavbar>
				</ProtectedRoute>
				<ProtectedRoute path="/report">
					<ProtectedNavbar>
						<Report />
					</ProtectedNavbar>
				</ProtectedRoute>

				<Route path="*">
					<Error404 />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
