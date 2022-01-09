import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["X-API-key"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["X-API-key"];
  }
};

export default setAuthToken;
