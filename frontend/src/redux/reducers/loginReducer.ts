const initState = {
  username: "",
  password: "",
  message: "",
  isSuccess: false,
  isLoading: false,
  isError: false,
};

interface LoginStateInterface {
  username: string;
  password: string;
  message: string;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const loginReducer = (state: LoginStateInterface = initState, action: any): object => {
  switch (action.type) {
    // SUCCESSFUL LOGIN
    case "LOGIN/SUCESS":
      return {
        ...state,
        username: "",
        password: "",
        isAuth: true,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    // TOGGLE FOR LOADING
    case "LOGIN/LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    // WHEN ERROR OCCURS DURING SUBMIT
    case "LOGIN/ERROR":
      return {
        ...state,
        isError: true,
        isLoading: false,
        password: "",
        message: action.payload,
      };
    // SETTING THE VALUE OF FORM DATA
    case "LOGIN/SET":
      return {
        ...state,
        [action.target]: action.value,
      };
    default:
      return initState;
  }
};

export default loginReducer;
