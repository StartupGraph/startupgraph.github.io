import React from "react";
import Icon from "react-fa";

import ControlPopup from "./ControlPopup";

class ControlGroup extends React.Component {
  state = { show: false };
  render() {
    return (
      <div>
        <a className="toggle-overlay" onClick={this.onToggleClick}>
          <Icon name="sliders" size="2x" />
        </a>
        {
          this.state.show ?
            <ControlPopup /> : null
        }
      </div>
    );
  }

  onToggleClick = () => {
    this.setState({ show: !this.state.show });
  }
}

export default ControlGroup;
