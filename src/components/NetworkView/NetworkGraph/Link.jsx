import React, { PropTypes } from "react";
import { connect } from "react-redux";

const typeColorMap = new Map();
typeColorMap.set("Founder", "#E55934");
typeColorMap.set("Senior Management", "#FA8F20");
typeColorMap.set("Mentor/Advisor", "#9BC53D");
typeColorMap.set("Investor/Board of Director", "#5BC0EB");
typeColorMap.set("Employee - Business", "#815ac8");
typeColorMap.set("Employee - Technology", "#1c4c94");
typeColorMap.set("Employee - Design", "#20cd8a");
typeColorMap.set("Employee - Other", "#54ab43");
typeColorMap.set("Other", "#FDE74C");

const mapStateToProps = state => ({
  networkGraphData: state.networkGraphData,
  displayLinkType: state.displayLinkType
});

class Link extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    displayLinkType: PropTypes.object.isRequired
  };
  render() {
    return (
      this.props.displayLinkType[this.props.data.type] ?
        <line
          x1={this.props.data.source.x}
          y1={this.props.data.source.y}
          x2={this.props.data.target.x}
          y2={this.props.data.target.y}
          stroke={typeColorMap.get(this.props.data.type)}
          strokeOpacity={0.5}
          strokeWidth={2}
        /> : null
    );
  }
}

export default connect(mapStateToProps)(Link);
