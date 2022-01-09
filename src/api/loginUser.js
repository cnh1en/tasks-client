import axios from "axios";

const loginUser = async (data) => {
  try {
    const resp = await axios.post("/api/v1/user/login", data);
    if (resp.data.success) {
      localStorage.setItem("api_key", resp.data.user.api_key);
    }
    return resp.data;
  } catch (error) {
    return error;
  }
};
export default loginUser;
