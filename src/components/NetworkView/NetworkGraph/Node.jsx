import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { selectEntity } from "redux/Actions";
import Store from "redux/Store";

const mapStateToProps = state => ({
  networkGraphData: state.networkGraphData,
  displayName: state.displaySetting.displayName
});

class Node extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    displayName: PropTypes.bool.isRequired
  };
  static defaultProps = { displayName: false };
  state = { hover: false };

  onNodeMouseEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ hover: true });
  };

  onNodeMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ hover: false });
  };

  onNodeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Store.dispatch(selectEntity(this.props.data.type, this.props.data.id));
  }

  render() {
    let fillColor = "#ecedf0";
    if (this.props.data.type === "person") fillColor = "#95a2ba";
    if (this.state.hover) fillColor = "#ddd";
    const radius = this.props.data.type === "person" ? 1 : Math.log(this.props.data.relations) * 4 + 5;
    return (
      <g>
        <circle
          style={{ cursor: this.state.hover ? "pointer" : "" }}
          id={this.props.data.id}
          key={this.props.data.id}
          cx={this.props.data.x}
          cy={this.props.data.y}
          r={radius + 2}
          fill={fillColor}
          stroke="white"
          strokeWidth="0.5"
          onClick={this.onNodeClick}
          onMouseDown={this.onNodeMouseDown}
          onMouseUp={this.onNodeMouseUp}
          onMouseMove={this.onNodeMouseMove}
          onMouseEnter={this.onNodeMouseEnter}
          onMouseLeave={this.onNodeMouseLeave}
        />
        {
          this.props.data.type === "person" ?
            (
              this.props.displayName ?
                <text
                  className="pointer-events-none"
                  x={this.props.data.x}
                  y={this.props.data.y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontFamily="Open Sans"
                  fontSize="5"
                >{ this.props.data.name }</text> : null
            ) :
            <image
              className="pointer-events-none"
              xlinkHref={require(`images/${this.props.data.logo}`)}
              x={this.props.data.x - radius}
              y={this.props.data.y - radius / this.props.data.logoAspectRatio}
              height={radius * 2 / this.props.data.logoAspectRatio}
              width={radius * 2}
            />
        }
      </g>
    );
  }
}

export default connect(mapStateToProps)(Node);
