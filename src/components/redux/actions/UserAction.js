import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../constaint";
const getUser = (data) => (dispatch) => {
  dispatch({
    type: "GET_USER",
    payload: data,
  });
};

const getUserCurrent = () => async (dispatch) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const user_current = await axios.get(`${URL}/api/v1/user`, {
      headers: {
        "X-API-Key": api_key,
      },
    });

    dispatch({
      type: "GET_USER_CURRENT",
      payload: user_current.data.user,
    });
  } catch (error) {
    localStorage.removeItem("api_key");
    dispatch({
      type: "GET_USER_CURRENT_FAILURE",
      payload: error.response.data,
    });
    console.log(error.response);
  }
};

const getAllUser = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${URL}/api/v1/user/user-list`, {
      headers: {
        "X-API-Key": localStorage.getItem("api_key"),
      },
    });
    dispatch({
      type: "GET_ALL_USER",
      payload: resp.data.users,
    });
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    console.log(error.response);
  }
};

const register = (data) => async (dispatch) => {
  try {
    const newUser = await axios.post(`${URL}/api/v1/user/register`, data);
    dispatch({
      type: "CREATE_USER_SUCCESS",
      payload: newUser.data.user,
    });
    console.log(newUser);
    toast.success("Created user successfully !");
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    dispatch({
      type: "CREATE_USER_FAILURE",
      payload: error.response.data,
    });
    toast.error("Error !");
  }
};
const deleteUser = (id) => async (dispatch) => {
  const apiKey = localStorage.getItem("api_key");
  try {
    await axios.delete(`${URL}/api/v1/user/${id}`, {
      headers: {
        "X-API-Key": apiKey,
      },
    });
    dispatch({
      type: "DELETE_USER",
      payload: id,
    });
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
  }
};
const updateUser = (userId, updatedData) => async (dispatch) => {
  const apiKey = localStorage.getItem("api_key");

  try {
    const updatedUser = await axios.patch(
      `${URL}/api/v1/user/${userId}`,
      updatedData,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );
    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: {
        userId,
        updatedUser: updatedUser.data.user,
      },
    });
    toast.success("Updated user successfully !");
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: error.response.data,
    });
    toast.error("Error !");
  }
};

const changeInfo = (userId, updatedData) => async (dispatch) => {
  const apiKey = localStorage.getItem("api_key");

  try {
    const updatedUser = await axios.patch(
      `${URL}/api/v1/user/${userId}`,
      updatedData,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );
    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: {
        userId,
        updatedUser: updatedUser.data.user,
      },
    });

    dispatch({
      type: "CHANGE_INFO_SUCCESS",
      payload: updatedData,
    });
    toast.success("Updated user successfully !");
  } catch (error) {
    if (error.response.data.apiKey === false) {
      localStorage.removeItem("api_key");
    }
    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: error.response.data,
    });
    toast.error("Error !");
  }
};
const clearUser = () => {
  return {
    type: "CLEAR_USER",
  };
};
export {
  getUser,
  getUserCurrent,
  getAllUser,
  register,
  clearUser,
  deleteUser,
  updateUser,
  changeInfo,
};
