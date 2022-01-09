import axios from "axios";
import { toast } from "react-toastify";
const forgotPassword = async (data) => {
  try {
    const response = await axios.post("/api/v1/user/forgot-password", data);
    toast.success("Successfully !!");
  } catch (error) {
    console.log(error.response.data);
    toast.error(`Error: ${error.response.data.message || ""}`);
  }
};
export default forgotPassword;
