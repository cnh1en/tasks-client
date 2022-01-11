import axios from "axios";
import { URL } from "../constaint";
const checkTask = async () => {
  return axios
    .get(`${URL}/api/v1/task/check-task`, {
      headers: {
        "X-API-Key": localStorage.getItem("api_key"),
      },
    })
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error.response));
};

export default checkTask;
