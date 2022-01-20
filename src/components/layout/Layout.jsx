import React, { useEffect, useRef } from "react";
import "./layout.css";
import "../../assets/css/theme.css";

import TopNav from "../topnav/TopNav";
import Sidebar from "../sidebar/Sidebar";
import Routes from "../Routes";

import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getUserCurrent,
  getAllUser,
  clearUser,
} from "../redux/actions/UserAction";
import { clearTask, getAllTask } from "../redux/actions/TaskAction";

function Layout() {
  const dispatch = useDispatch();
  const layout_content = useRef(null);
  const apiKey = localStorage.getItem("api_key");
  useEffect(() => {
    if (apiKey) {
      dispatch(getUserCurrent());
      dispatch(getAllUser());
      dispatch(getAllTask());
    }
  }, [apiKey, dispatch]);
  if (!apiKey) {
    dispatch(clearTask());
    dispatch(clearUser());
    return <Redirect to="/login" />;
  }
  return (
    <Switch>
      <Route
        render={(props) => (
          <div className="layout">
            <Sidebar {...props} layoutContent={layout_content} />
            <div className="layout__content avt-res" ref={layout_content}>
              <TopNav />
              <div className="layout__content-main">
                <Routes />
              </div>
            </div>
          </div>
        )}
      />
    </Switch>
  );
}

export default Layout;
