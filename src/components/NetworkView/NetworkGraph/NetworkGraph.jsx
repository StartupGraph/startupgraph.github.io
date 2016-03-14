import React, { PropTypes } from "react";
import { connect } from "react-redux";
import Spinner from "components/Spinner";

import { initBackingForceInstance, setSize } from "./BackingForceInstance";
import Chart from "./Chart";

const mapStateToProps = (state) => ({ data: state.networkGraphData });

class NetworkGraph extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.shape({
        isFetching: PropTypes.bool,
        nodes: PropTypes.arrayOf(PropTypes.object),
        links: PropTypes.arrayOf(PropTypes.object)
      }).isRequired
  };

  constructor(props) {
    super(props);
    initBackingForceInstance(this.props.width, this.props.height);
  }

  componentWillReceiveProps({ width }) {
    if (this.props.width !== width) {
      setSize(width, this.props.height);
    }
  }

  render() {
    return (
      this.props.data.isFetching ?
        <Spinner /> :
        <Chart
          data={this.props.data}
          width={this.props.width}
          height={this.props.height}
        />
    );
  }
}

export default connect(mapStateToProps)(NetworkGraph);
