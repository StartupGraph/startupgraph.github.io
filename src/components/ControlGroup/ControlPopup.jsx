import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { addNetworkGraphDisplayLinkType, removeNetworkGraphDisplayLinkType, toggleDisplayName } from "redux/Actions";
import LinkFilteringCheckbox from "./LinkFilteringCheckbox";

const linkType = [ "Founder", "Senior Management", "Mentor/Advisor", "Investor/Board of Director", "Employee - Business", "Employee - Technology", "Employee - Design", "Employee - Other", "Other" ];

const mapStateToProps = state => ({
  displayLinkType: state.displayLinkType,
  displayName: state.displayName
});

const mapDispatchToProps = dispatch => ({
  addLinkType: type => {
    dispatch(addNetworkGraphDisplayLinkType(type));
  },
  removeLinkType: type => {
    dispatch(removeNetworkGraphDisplayLinkType(type));
  },
  toggleDisplayName: () => {
    dispatch(toggleDisplayName());
  }
});

class ControlPopup extends React.Component {
  static propTypes = {
    displayName: PropTypes.bool.isRequired,
    displayLinkType: PropTypes.object.isRequired,
    addLinkType: PropTypes.func.isRequired,
    removeLinkType: PropTypes.func.isRequired,
    toggleDisplayName: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="modal arrow_box">
        <h6>Type of relationships</h6>
        {
          linkType.map(type =>
            <LinkFilteringCheckbox
              key={type}
              type={type}
              isChecked={this.props.displayLinkType[type]}
              addLinkType={this.props.addLinkType}
              removeLinkType={this.props.removeLinkType}
            />)
        }
        <h6>Other setting</h6>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.props.displayName}
              onChange={this.props.toggleDisplayName}
            />
            Display individual name
          </label>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPopup);
