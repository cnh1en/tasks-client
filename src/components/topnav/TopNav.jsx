import React from "react";
import Dropdown from "../dropdown/Dropdown";
import "./topnav.css";
import { useDispatch, useSelector } from "react-redux";
import user_menu from "../../assets/JsonData/user_menus.json";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { clearTask } from "../redux/actions/TaskAction";
import { clearUser } from "../redux/actions/UserAction";
import { Avatar } from "antd";

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

  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <h3 className="topnav__right-user">
            {currentUser ? "Hello, " + currentUser.name : ""}
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
      </div>
    </div>
  );
};

export default Topnav;
