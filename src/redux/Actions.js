export function updateNetworkGraphData(data) {
  return { type: "UPDATE_NETWORKGRAPH_DATA", data };
}

function notifyEntitySelection(id, entityType) {
  return { type: "SELECT_ENTITY", id, entityType };
}

export function toggleDisplayName() {
  return { type: "TOGGLE_DISPLAY_NAME" };
}

export function addNetworkGraphDisplayLinkType(linkType) {
  return { type: "ADD_NETWORKGRAPH_DISPLAY_LINKTYPE", linkType };
}

export function removeNetworkGraphDisplayLinkType(linkType) {
  return { type: "REMOVE_NETWORKGRAPH_DISPLAY_LINKTYPE", linkType };
}

export function requestEntity() {
  return { type: "REQUEST_ENTITY" };
}

export function receiveEntity(entityType, entity) {
  return { type: "RECEIVE_ENTITY", entityType, entity };
}

function shouldFetchEntity(entityList, id) {
  return !entityList.some(entity => entity.id === id);
}

function fetchEntity(entityType, id) {
  return dispatch => {
    dispatch(requestEntity());
    return fetch(require(`data/Entity/${entityType}/${id.substr(2)}.json`))
      .then(response => response.json())
      .then(json => dispatch(receiveEntity(entityType, json)));
  };
}

function fetchEntityIfNeeded(entityType, id) {
  return (dispatch, getState) => {
    if (shouldFetchEntity(getState().entities[entityType], id)) {
      return dispatch(fetchEntity(entityType, id));
    }
    return Promise.resolve();
  };
}

export function selectEntity(entityType, id) {
  return (dispatch) => {
    dispatch(fetchEntityIfNeeded(entityType, id));
    return dispatch(notifyEntitySelection(id, entityType));
  };
}
