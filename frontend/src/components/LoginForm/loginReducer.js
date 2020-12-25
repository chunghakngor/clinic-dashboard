const reducer = (state, action) => {
	switch (action.type) {
		// SUCCESSFUL LOGIN
		case "SUCESS":
			return {
				...state,
				username: "",
				password: "",
				isAuth: true,
				isLoading: false,
				isError: false,
				isSuccess: true,
				message: action.value,
			};
		// TOGGLE FOR LOADING
		case "LOADING":
			return {
				...state,
				isLoading: !state.isLoading,
			};
		// WHEN ERROR OCCURS DURING SUBMIT
		case "ERROR":
			return {
				...state,
				isError: true,
				isLoading: false,
				password: "",
				message: action.value,
			};
		// SETTING THE VALUE OF FORM DATA
		case "SET":
			return {
				...state,
				[action.target]: action.value,
			};
		default:
			return { ...state };
	}
};

export default reducer;
