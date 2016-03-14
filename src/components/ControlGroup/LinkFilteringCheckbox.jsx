import React, { PropTypes } from "react";

class LinkFilteringCheckbox extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    addLinkType: PropTypes.func.isRequired,
    removeLinkType: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.onChange}
          />
          { this.props.type }
        </label>
      </div>
    );
  }

  onChange = e => {
    if (e.target.checked) {
      this.props.addLinkType(this.props.type);
    } else {
      this.props.removeLinkType(this.props.type);
    }
  }
}

export default LinkFilteringCheckbox;
