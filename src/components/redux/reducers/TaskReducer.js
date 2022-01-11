const TaskReducer = (state = { tasks: [], error: {} }, action) => {
  switch (action.type) {
    case "GET_ALL_TASK":
      return { ...state, tasks: action.payload };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "CREATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: {},
      };
    case "CREATE_TASK_FAILURE":
      return { ...state, error: action.payload };

    case "UPDATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload.taskId ? action.payload.updatedTask : task
        ),
        error: {},
      };
    case "UPDATE_TASK_FAILURE":
      return {
        ...state,
        error: action.payload.error,
      };
    case "DELETE_ERROR":
      return {
        ...state,
        error: {},
      };
    case "SUBMIT_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload.id ? action.payload.updatedTask : task
        ),
      };
    case "DELETE_ALL_TASK":
      return {
        ...state,
        tasks: [...action.payload],
      };
    case "CLEAR_TASK":
      return { ...state, tasks: null };
    default:
      return state;
  }
};
export default TaskReducer;
