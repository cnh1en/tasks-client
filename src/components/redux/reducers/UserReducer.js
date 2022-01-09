const UserReducer = (
  state = { users: null, user_current: null, error: {} },
  action
) => {
  const { users, user_current } = state;
  switch (action.type) {
    case "CLEAR_USER":
      return { ...state, users: null, user_current: null };
    case "GET_USER":
      return { ...state, user_current: action.payload };
    case "GET_USER_CURRENT":
      return { ...state, user_current: action.payload };
    case "GET_USER_CURRENT_FAILURE":
      return { ...state, error: action.payload };
    case "DELETE_USER":
      return {
        ...state,
        users: users.filter((user) => user._id !== action.payload),
      };
    case "GET_ALL_USER":
      return { ...state, users: action.payload };
    case "CREATE_USER_SUCCESS":
      return { ...state, users: [...users, action.payload], error: {} };
    case "CREATE_USER_FAILURE":
      return { ...state, error: action.payload };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        users: users.map((user) =>
          user._id === action.payload.userId ? action.payload.updatedUser : user
        ),
        error: {},
      };
    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    case "CHANGE_INFO_SUCCESS":
      return {
        ...state,
        user_current: {
          ...user_current,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
export default UserReducer;
