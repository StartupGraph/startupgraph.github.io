import React, { PropTypes } from "react";
import NetworkGraph from "./NetworkGraph";
import SelectionPanel from "./SelectionPanel";

class NetworkView extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number.isRequired
  };

  state = { networkGraphContainerWidth: 0 };

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-8 col-xl-9">
          <div className="row">
            <NetworkGraph height={this.props.height} width={this.state.networkGraphContainerWidth} />
          </div>
        </div>
        <div className="col-xs-12 col-lg-4 col-xl-3">
          <div className="row">
            <SelectionPanel />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("throttledResize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("throttledResize", this.onResize);
  }

  onResize = () => {
    if (window.innerWidth >= 1200) {
      this.setState({ networkGraphContainerWidth: window.innerWidth * 9 / 12 });
    } else if (window.innerWidth >= 992) {
      this.setState({ networkGraphContainerWidth: window.innerWidth * 8 / 12 });
    } else {
      this.setState({ networkGraphContainerWidth: window.innerWidth });
    }
  }
}

export default NetworkView;
