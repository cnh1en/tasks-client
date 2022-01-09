import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "./thememenu.css";

import ThemeAction from "../redux/actions/ThemeAction";
const mode_settings = [
  {
    id: "light",
    name: "Light",
    background: "light-background",
    class: "theme-mode-light",
  },
  {
    id: "dark",
    name: "Dark",
    background: "dark-background",
    class: "theme-mode-dark",
  },
];

const color_settings = [
  {
    id: "blue",
    name: "Blue",
    background: "blue-color",
    class: "theme-color-blue",
  },
  {
    id: "red",
    name: "Red",
    background: "red-color",
    class: "theme-color-red",
  },
  {
    id: "cyan",
    name: "Cyan",
    background: "cyan-color",
    class: "theme-color-cyan",
  },
  {
    id: "green",
    name: "Green",
    background: "green-color",
    class: "theme-color-green",
  },
  {
    id: "orange",
    name: "Orange",
    background: "orange-color",
    class: "theme-color-orange",
  },
];

const clickOutsieRef = (toggle_ref, content_ref) => {
  document.addEventListener("click", (e) => {
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};
const ThemeMenu = () => {
  const menu_ref = useRef(null);
  const menu_toggle_ref = useRef(null);

  const dispatch = useDispatch();

  clickOutsieRef(menu_toggle_ref, menu_ref);
  const [currMode, setCurrMode] = useState("light");
  const [currColor, setCurrColor] = useState("blue");

  const setMode = (mode) => {
    setCurrMode(mode.id);
    localStorage.setItem("themeMode", mode.class);
    dispatch(ThemeAction.setMode(mode.class));
  };
  const setColor = (color) => {
    setCurrColor(color.id);
    localStorage.setItem("colorMode", color.class);
    dispatch(ThemeAction.setColor(color.class));
  };
  const closeActive = () => menu_ref.current.classList.remove("active");
  useEffect(() => {
    const themeClass = mode_settings.find(
      (e) => e.class === localStorage.getItem("themeMode") || "theme-mode-light"
    );
    const colorClass = color_settings.find(
      (e) => e.class === localStorage.getItem("colorMode") || "theme-color-blue"
    );
    setCurrMode(themeClass.id);
    setCurrColor(colorClass.id);
  }, []);
  return (
    <div>
      <button
        ref={menu_toggle_ref}
        className="dropdown__toggle"
        // onClick={() => setActive()}
      >
        <i className="bx bx-palette"></i>
      </button>

      <div ref={menu_ref} className="theme-menu">
        <h4>Theme Settings</h4>
        <div className="theme-menu__close" onClick={() => closeActive()}>
          <i className="bx bx-x"></i>
        </div>
        <div className="theme-menu__select">
          <span>Choose Mode</span>
          <ul className="mode-list">
            {mode_settings.map((item, index) => (
              <li key={index} onClick={() => setMode(item)}>
                <div
                  className={`mode-list__color ${item.background} 
                  ${currMode === item.id ? "active" : ""}`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="theme-menu__select">
          <span>Choose Mode</span>
          <ul className="mode-list">
            {color_settings.map((item, index) => (
              <li key={index} onClick={() => setColor(item)}>
                <div
                  className={`mode-list__color ${item.background} ${
                    currColor === item.id ? "active" : ""
                  }`}
                >
                  <i className="bx bx-check"></i>
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeMenu;
