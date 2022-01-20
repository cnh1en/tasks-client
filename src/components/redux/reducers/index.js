import UserReducer from "./UserReducer";
import TaskReducer from "./TaskReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  UserReducer,
  TaskReducer,
});

export default rootReducer;
