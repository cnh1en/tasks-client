import React from "react";
import Layout from "./components/layout/Layout";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Login from "./components/account/login/Login";
import Landing from "./pages/Landing";
import { useSelector } from "react-redux";
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.AuthReducer);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route render={() => <Layout />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
