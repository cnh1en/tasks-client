import React from "react";
import Dropdown from "../dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./topnav.css";

import notifications from "../../assets/JsonData/notification.json";
import user_menu from "../../assets/JsonData/user_menus.json";
import user_image from "../../assets/images/tuat.png";
import ThemeMenu from "../thememenu/ThemeMenu";
import { useRef } from "react";
import { clearTask } from "../redux/actions/TaskAction";
import { clearUser } from "../redux/actions/UserAction";
import { logout } from "../redux/actions/AuthAction";
import { Avatar } from "antd";
import { PresetStatusColorTypes } from "antd/lib/_util/colors";

const renderNotificationIcon = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);
const curr_user = {
  display_name: "Tuat Tran",
  image: user_image,
};
const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <Avatar size="large" style={{ backgroundColor: "var(--main-color)" }}>
        {user.slice(0, 2)}
      </Avatar>
    </div>
  </div>
);
const clearRedux = (dispatch) => {
  dispatch(clearUser());
  dispatch(clearTask());
  dispatch(logout());
};
const Topnav = () => {
  const dispatch = useDispatch();
  const ref = useRef([]);

  const currentUser = useSelector((state) => state.UserReducer.user_current);
  const renderUserMenu = (item, index) => (
    <div className="notification-item" key={index}>
      <Link
        to={`${item.route}`}
        ref={(el) => (ref.current[index] = el)}
        onClick={
          item.route === "/login"
            ? () => {
                clearRedux(dispatch);
              }
            : null
        }>
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </Link>
    </div>
  );
  const state = useSelector((state) => state.UserReducer);
  const user_current = state.user_current;
  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <h3 className="topnav__right-user">
            {user_current ? "Hello, " + user_current.name : ""}
          </h3>
        </div>
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() =>
              renderUserToggle(currentUser ? currentUser.name : "")
            }
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        {/* <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationIcon(item, index)}
            renderFooter={() => <Link to="/">View all</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown icon="bx bx-user" />
          <ThemeMenu />
        </div> */}
      </div>
    </div>
  );
};

export default Topnav;
