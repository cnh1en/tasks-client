import axios from "axios";
const createUser = async (data) => {
  try {
    const resp = await axios.post("/api/v1/user/register", data);
    return resp.data;
  } catch (error) {
    return error;
  }
};
export default createUser;
