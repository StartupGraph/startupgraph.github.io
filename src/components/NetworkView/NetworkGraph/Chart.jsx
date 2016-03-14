import { isEqualWith } from "lodash";
import React, { PropTypes } from "react";
import Link from "./Link";
import Node from "./Node";

class Chart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object),
        links: PropTypes.arrayOf(PropTypes.object)
      })
  };

  state = {
    dragLock: false,
    position: [ - this.props.width / 2, - this.props.height / 2 ],
    mousePosition: [ 0, 0 ],
    scale: 2
  };

  shouldComponentUpdate({ width, height, data }, { position, scale }) {
    return this.props.width !== width ||
      this.props.height !== height ||
      isEqualWith(this.props.data.nodes, data.nodes, (a, b) => a.id === b.id) ||
      isEqualWith(this.props.data.links, data.links, (a, b) => a.id === b.id) ||
      this.state.position[0] !== position[0] ||
      this.state.position[1] !== position[1] ||
      this.state.scale !== scale;
  }

  render() {
    const { scale, position } = this.state;
    const svgTransform = `matrix(${scale}, 0, 0, ${scale}, ${position[0]}, ${position[1]})`;
    return (
      <svg
        className="NetworkGraph"
        width={this.props.width} height={this.props.height}
        onWheel={this.onWheel} onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}
        onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}
      >
        <g transform={svgTransform} cursor="move">
          {
            this.props.data.links.map((link, i) =>
              <Link key={`l${i}`} data={link} />)
          }
          {
            this.props.data.nodes.map((node, i) =>
              <Node key={`n${i}`} data={node} />)
          }
        </g>
      </svg>
    );
  }

  onMouseDown = () => { this.setState({ dragLock: true }); };
  onMouseUp = () => { this.setState({ dragLock: false }); };
  onMouseOver = () => {};

  onMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragLock: false });
  };

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.dragLock) {
      this.setState({
        position: [
          this.state.position[0] + e.pageX - this.state.mousePosition[0],
          this.state.position[1] + e.pageY - this.state.mousePosition[1] - 54
        ]
      });
    }
    this.setState({ mousePosition: [ e.pageX, e.pageY - 54 ] });
  };

  onWheel = (e) => {
    e.preventDefault();
    const zoomChange = Math.pow(2, e.deltaY * 0.002);
    const newScale = zoomChange * this.state.scale;
    if (newScale > 6 || newScale < 1) return;
    this.setState({
      position: [
        (this.state.position[0] - this.state.mousePosition[0]) * zoomChange + this.state.mousePosition[0],
        (this.state.position[1] - this.state.mousePosition[1]) * zoomChange + this.state.mousePosition[1]
      ],
      scale: newScale
    });
  };
}

export default Chart;
