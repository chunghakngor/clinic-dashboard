export const LOGIN_SUCCESS = (payload: string) => {
  return {
    type: "LOGIN/SUCCESS",
    payload,
  };
};

export const LOGIN_ERROR = (payload: string) => {
  return {
    type: "LOGIN/ERROR",
    payload,
  };
};
