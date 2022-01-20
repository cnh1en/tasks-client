import React from "react";

import "./sidebar.css";

import logo from "../../assets/images/logo.png";

import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import sidebar_items_normal from "../../assets/JsonData/sidebar-normal.json";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useRef } from "react";
const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span className="link">{props.title}</span>
      </div>
    </div>
  );
};
const addActvieSidebar = (toggle_ref, content_ref, layout__content, e) => {
  if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
    content_ref.current.classList.toggle("active");
    layout__content.current &&
      layout__content.current.classList.toggle("active");
  }
};

const Sidebar = (props) => {
  const layout__content = props.layoutContent;
  const user_current = useSelector((state) => state.UserReducer.user_current);
  const sidebar_need =
    user_current && user_current.usertype === "admin"
      ? sidebar_items
      : sidebar_items_normal;

  const activeItem = sidebar_need.findIndex(
    (item) => item.route === props.location.pathname
  );

  const btn_toggle = useRef(null);
  const sidebar = useRef(null);
  return (
    <div className="sidebar act-res" ref={sidebar}>
      <div
        className="btn-toggle"
        ref={btn_toggle}
        onClick={(e) =>
          addActvieSidebar(btn_toggle, sidebar, layout__content, e)
        }>
        <i className="bx bx-menu"></i>
      </div>
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_need.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
