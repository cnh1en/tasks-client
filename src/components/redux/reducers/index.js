import ThemeReducer from "./ThemeReducer";
import UserReducer from "./UserReducer";
import TaskReducer from "./TaskReducer";
import AuthReducer from "./AuthReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  ThemeReducer,
  UserReducer,
  TaskReducer,
  AuthReducer,
});

export default rootReducer;
