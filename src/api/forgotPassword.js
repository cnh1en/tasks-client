import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../constaint";
const forgotPassword = async (data) => {
  try {
    await axios.post(`${URL}/api/v1/user/forgot-password`, data);
    toast.success("Successfully !!");
  } catch (error) {
    console.log(error.response.data);
    toast.error(`Error: ${error.response.data.message || ""}`);
  }
};
export default forgotPassword;
