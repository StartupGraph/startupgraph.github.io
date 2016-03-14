import "babel-polyfill";
import React from "react";
import { render as renderIntoDOM } from "react-dom";
import { Provider } from "react-redux";
import "./theme/style.scss";

import Store from "./redux/Store";
import App from "./components/Application";

(() => {
  const throttle = (type, name) => {
    let running = false;
    const func = () => {
      if (running) { return; }
      running = true;
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    window.addEventListener(type, func);
  };
  throttle("resize", "throttledResize");
})();

renderIntoDOM(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
