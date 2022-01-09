import axios from "axios";
const fetchTask = async (setState) => {
  const api_key = localStorage.getItem("api_key");

  try {
    const resp = await axios.get("/api/v1/task", {
      headers: {
        "X-API-Key": api_key,
      },
    });
    const tasks = resp.data;
    setState(tasks.tasks);
    console.log(tasks);
  } catch (error) {
    console.log(error.response);
  }
};
export default fetchTask;
