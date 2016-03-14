import React, { PropTypes } from "react";
import Icon from "react-fa";

const TwitterLink = ({ username }) => (
  username &&
  <span>
    <Icon className="react-fa" name="twitter" />
    <a href={`https://twitter.com/${username}`} target="_blank">
      @{ username }
    </a>
  </span>
);

class EntityView extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    entity: PropTypes.object.isRequired
  };
  render() {
    let strs;
    if (!this.props.isFetching) {
      const s1 = this.props.entity.overview.replace(/\]\(/g, "|](|");
      const s2 = s1.replace(/[\[\)]/g, "|");
      strs = s2.split("|");
    }
    return this.props.isFetching ?
      <div className="text-center text-middle">Fetching...</div> :
      <div>
        <h5 className="m-t-1">{this.props.entity.name}</h5>
        <TwitterLink username={this.props.entity.twitter_username} />
        <p className="overview">{
          strs.map((str, i, arr) => {
            if (str === "](") {
              return <a href={arr[i + 1].charAt(0) === "/" ? `https://www.crunchbase.com${arr[i + 1]}` : arr[i + 1]} target="_blank">{arr[i - 1]}</a>;
            }
            if (arr[i + 1] === "](") return "";
            if (arr[i - 1] === "](") return "";
            return str;
          })
          }</p>
      </div>;
  }
}

export default EntityView;
