import React from "react";
import ControlGroup from "components/ControlGroup";

const Header = () => (
  <header>
    <nav className="navbar navbar-full navbar-light bg-faded">
      <a className="navbar-brand" href="#">StartupGraph</a>
      <div className="navbar-nav pull-xs-right">
        <ControlGroup />
      </div>
    </nav>
  </header>
);

export default Header;
