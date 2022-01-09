import axios from "axios";

const assignTask = async (data) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const resp = await axios.post("/api/v1/task/create-task", data, {
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
