import React, { useReducer, useEffect } from "react";

import Report from "./components/Report";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

// import reducer from "./utils/mainReducer";

const reducer = (state, action) => {
	return state;
};

const initialState = {
	isAuth: false,
	isLoading: true,
	isError: false,
};

export const MainContext = React.createContext();

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch();
	}, []);

	return (
		<MainContext.Provider value={{ state }}>
			<React.Fragment>
				<Dashboard />
				<Landing />
				<LoginForm />
				<RegisterForm />
				<Report />
			</React.Fragment>
		</MainContext.Provider>
	);
};

export default App;
