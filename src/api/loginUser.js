import axios from "axios";
import { URL } from "../constaint";
const loginUser = async (data) => {
  try {
    const resp = await axios.post(`${URL}/api/v1/user/login`, data);
    if (resp.data.success) {
      localStorage.setItem("api_key", resp.data.user.api_key);
    }
    return resp.data;
  } catch (error) {
    return error;
  }
};
export default loginUser;
