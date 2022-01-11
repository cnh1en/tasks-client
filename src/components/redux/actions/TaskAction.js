import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../constaint";
const getAllTask = () => async (dispatch) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const resp = await axios.get(`${URL}/api/v1/task`, {
      headers: {
        "X-API-Key": api_key,
      },
    });
    dispatch({
      type: "GET_ALL_TASK",
      payload: resp.data.tasks,
    });
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    console.log(error.response);
  }
};

const deleteTask = (id) => async (dispatch) => {
  const api_key = localStorage.getItem("api_key");
  try {
    await axios.delete(`${URL}/api/v1/task/${id}`, {
      headers: {
        "X-API-Key": api_key,
      },
    });
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    console.log(error.response);
  }
};

const createTask = (data) => async (dispatch) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const task = await axios.post(`${URL}/api/v1/task/create-task`, data, {
      headers: {
        "X-API-Key": api_key,
      },
    });
    dispatch({
      type: "CREATE_TASK_SUCCESS",
      payload: task.data.newTask,
    });
    toast.success("Task created successfully !");
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    dispatch({
      type: "CREATE_TASK_FAILURE",
      payload: error.response.data,
    });
    toast.error("Error !");
  }
};
const updateTaskAction = (taskId, data) => async (dispatch) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const task = await axios.patch(`${URL}/api/v1/task/${taskId}`, data, {
      headers: {
        "X-API-Key": api_key,
      },
    });
    dispatch({
      type: "UPDATE_TASK_SUCCESS",
      payload: {
        taskId,
        updatedTask: task.data.task,
      },
    });
    toast.success("Task updated successfully !");
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    dispatch({
      type: "UPDATE_TASK_FAILURE",
      payload: {
        error,
      },
    });
    toast.error("Error !");
  }
};
const submitTask = (taskId) => async (dispatch) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const task = await axios.patch(
      `${URL}/api/v1/task/submit-task/${taskId}`,
      {},
      {
        headers: {
          "X-API-Key": api_key,
        },
      }
    );
    dispatch({
      type: "SUBMIT_TASK_SUCCESS",
      payload: {
        id: taskId,
        updatedTask: task.data.task,
      },
    });
    toast.success("Submited successfully !");
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    console.log(error);
  }
};
const deleteAllTask = (email) => async (dispatch) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const tasks = await axios.delete(
      `${URL}/api/v1/task/delete-all-task/${email}`,
      {
        headers: {
          "X-API-Key": api_key,
        },
      }
    );
    dispatch({
      type: "DELETE_ALL_TASK",
      payload: tasks.data.tasks,
    });
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    console.log(error.response);
  }
};
const clearError = () => {
  return {
    type: "DELETE_ERROR",
  };
};
const clearTask = () => {
  return {
    type: "CLEAR_TASK",
  };
};
export {
  getAllTask,
  deleteTask,
  createTask,
  clearTask,
  updateTaskAction,
  submitTask,
  deleteAllTask,
  clearError,
};
