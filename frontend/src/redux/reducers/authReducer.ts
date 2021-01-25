const initState = {
  isAuth: false,
  userInfo: {},
  isLoading: false,
};

const authReducer = (state: object = initState, action: any) => {
  switch (action.type) {
    case "AUTH/LOGIN":
      return {
        ...state,
        isAuth: true,
        userInfo: action.payload,
      };

    case "AUTH/LOGOUT":
      return {
        ...state,
        isAuth: false,
        userInfo: {},
      };

    case "AUTH/LOADING":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return initState;
  }
};

export default authReducer;
