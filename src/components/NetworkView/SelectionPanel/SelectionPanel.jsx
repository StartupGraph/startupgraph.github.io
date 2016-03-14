import React, { PropTypes } from "react";
import { connect } from "react-redux";
import EntityView from "./EntityView";

const mapStateToProps = state => ({
  selectedEntity: state.selectedEntity,
  isFetching: state.entities.isFetching,
  entity: (state.selectedEntity.id === null || state.entities.isFetching) ?
      {} : state.entities[state.selectedEntity.entityType]
        .find(entity => entity.id === state.selectedEntity.id)
});

class SelectionPanel extends React.Component {
  static propTypes = {
    selectedEntity: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    entity: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="col-xs-12 SelectionPanel">
        {
          this.props.selectedEntity.id === null ?
            <div className="text-center text-middle">Nothing is selected yet...</div> :
            <EntityView isFetching={this.props.isFetching} entity={this.props.entity} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(SelectionPanel);
