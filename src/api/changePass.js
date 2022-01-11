import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../constaint";
const changePass = async (data) => {
  const apiKey = localStorage.getItem("api_key");
  try {
    const changePass = await axios.post(
      `${URL}/api/v1/user/change-pass`,
      data,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      }
    );
    toast.success("Successfully!!");
  } catch (error) {
    toast.error("Error !");
  }
};
export default changePass;
