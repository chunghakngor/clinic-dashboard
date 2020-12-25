import React, { useReducer, useEffect } from "react";

const AuthContext = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isAuth: true,
				userInfo: action.value,
			};

		case "LOGOUT":
			return {
				...state,
				isAuth: false,
				userInfo: {},
			};

		case "AUTH":
			return {
				...state,
				isAuth: true,
			};

		case "LOADING":
			return {
				...state,
				isLoading: false,
			};

		default:
			return {
				...state,
			};
	}
};

const initState = {
	isAuth: false,
	userInfo: {},
	isLoading: true,
};

export const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initState);

	const { isAuth, userInfo, isLoading } = state;

	const setAuth = (status, userData) => {
		if (status) {
			dispatch({ type: "LOGIN", value: userData });
		} else {
			dispatch({ type: "LOGOUT" });
			document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		}
	};

	useEffect(() => {
		fetch("http://localhost:4000/auth", {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch({ type: "AUTH" });
				}
			});
		setTimeout(() => {
			dispatch({ type: "LOADING" });
		}, 1000);
	}, []);

	return <AuthContext.Provider value={{ isAuth, userInfo, setAuth, isLoading }} {...props} />;
};

export const useAuth = () => React.useContext(AuthContext);
