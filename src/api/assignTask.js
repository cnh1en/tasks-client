import axios from "axios";
import { URL } from "../constaint";
const assignTask = async (data) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const resp = await axios.post(`${URL}/api/v1/task/create-task`, data, {
      headers: {
        "X-API-Key": api_key,
      },
    });
    return resp.data;
  } catch (error) {
    return error.response;
  }
};

export default assignTask;
