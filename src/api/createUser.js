import axios from "axios";
import { URL } from "../constaint";
const createUser = async (data) => {
  try {
    const resp = await axios.post(`${URL}/api/v1/user/register`, data);
    return resp.data;
  } catch (error) {
    return error;
  }
};
export default createUser;
