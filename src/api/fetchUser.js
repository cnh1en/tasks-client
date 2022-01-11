import axios from "axios";
import { URL } from "../constaint";
const fetchUser = async (setUsers) => {
  const api_key = localStorage.getItem("api_key");
  try {
    const userList = await axios.get(`${URL}/api/v1/user/user-list`, {
      headers: {
        "X-API-Key": api_key,
      },
    });
    setUsers(userList.data.users);
  } catch (error) {
    console.log(error.response.data);
  }
};
export default fetchUser;
