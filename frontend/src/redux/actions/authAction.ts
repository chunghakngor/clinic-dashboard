export const AUTH_LOGIN = (userInfo: object) => {
  return {
    type: "AUTH/LOGIN",
    payload: userInfo,
  };
};

export const AUTH_LOGOUT = () => {
  return {
    type: "AUTH/LOGOUT",
  };
};

export const AUTH_ERROR = () => {
  return {
    type: "AUTH/ERROR",
  };
};
