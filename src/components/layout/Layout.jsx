import React, { useEffect, useRef } from "react";
import "./layout.css";
import "../../assets/css/theme.css";

import TopNav from "../topnav/TopNav";
import Sidebar from "../sidebar/Sidebar";
import Routes from "../Routes";

import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeAction from "../redux/actions/ThemeAction";
import { useDispatch } from "react-redux";
import {
  getUserCurrent,
  getAllUser,
  clearUser,
} from "../redux/actions/UserAction";
import { clearTask, getAllTask } from "../redux/actions/TaskAction";
import checkTask from "../../api/checkTask";
import { setAuth } from "../redux/actions/AuthAction";
function Layout() {
  const themeState = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.UserReducer.error.success
  );
  const apiKey = localStorage.getItem("api_key");
  useEffect(() => {
    const mode = localStorage.getItem("themeMode");
    const color = localStorage.getItem("colorMode");
    dispatch(ThemeAction.setMode(mode));
    dispatch(ThemeAction.setColor(color));
    // setAuth(isAuthenticated);

    if (apiKey) {
      dispatch(getUserCurrent());
      dispatch(getAllUser());
      dispatch(getAllTask());
      // checkTask();
    }
  }, []);
  const layout_content = useRef(null);
  if (!apiKey) {
    dispatch(clearTask());
    dispatch(clearUser());
    return <Redirect to="/login" />;
  }
  return (
    <Switch>
      <Route
        render={(props) => (
          <div className={`layout ${themeState.mode} ${themeState.color}`}>
            <Sidebar {...props} layoutContent={layout_content} />
            <div className="layout__content" ref={layout_content}>
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
