export const LOGIN_SUCCESS = () => {
  return {
    type: "LOGIN/SUCCESS",
  };
};

export const LOGIN_ERROR = (payload: string) => {
  return {
    type: "LOGIN/ERROR",
    payload,
  };
};
