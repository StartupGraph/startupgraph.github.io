import React from "react";
import NetworkView from "components/NetworkView";

class Main extends React.Component {
  state = { width: window.innerWidth };

  render() {
    return (
      <div className="container-fluid">
        <NetworkView height={640} width={this.state.width} />
      </div>
    );
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("throttledResize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("throttledResize", this.updateWidth);
  }

  updateWidth = () => {
    this.setState({ width: window.innerWidth });
  };
}

export default Main;
