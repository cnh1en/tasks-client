const initialState = {
  authLoading: true,
  isAuthenticated: false,
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        authLoading: false,
      };

    case "SET_AUTH_FAILURE":
      return { ...state, isAuthenticated: false, authLoading: true };
    case "LOG_OUT":
      return { ...state, isAuthenticated: false, authLoading: true };
    default:
      return state;
  }
};
export default AuthReducer;
