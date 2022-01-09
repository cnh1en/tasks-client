import { Redirect } from "react-router-dom";

const Landing = () => {
  const apiKey = localStorage.getItem("api_key") || null;
  return apiKey ? <Redirect to="/dashboard" /> : <Redirect to="/login" />;
};

export default Landing;
