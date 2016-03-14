import { combineReducers } from "redux";

export const initialState = {
  // token: "13225d033c5f3eb30ef50daa5b704ec6fec6b14052dcbcd8",
  networkGraphData: {
      isFetching: true,
      nodes: [],
      links: []
    },
  displaySetting: {
    displayName: false
  },
  displayLinkType: {
      "Founder": true,
      "Senior Management": true,
      "Mentor/Advisor": true,
      "Investor/Board of Director": true,
      "Employee - Business": true,
      "Employee - Technology": true,
      "Employee - Design": true,
      "Employee - Other": true,
      "Other": true
    },
  selectedEntity: {
      id: null,
      entityType: null
    },
  entities: {
      isFetching: false,
      person: [],
      company: []
    }
};

function networkGraphData(state = initialState.networkGraphData, action) {
  switch (action.type) {
    case "UPDATE_NETWORKGRAPH_DATA":
      return Object.assign({}, state, action.data, { isFetching: false });
    default:
      return state;
  }
}

function selectedEntity(state = initialState.selectedEntity, action) {
  if (action.type === "SELECT_ENTITY") {
    return { id: action.id, entityType: action.entityType };
  }
  return state;
}

function displaySetting(state = initialState.displaySetting, action) {
  if (action.type === "TOGGLE_DISPLAY_NAME") {
    return { displayName: !state.displayName };
  }
  return state;
}

function displayLinkType(state = initialState.displayLinkType, action) {
  if (action.type === "ADD_NETWORKGRAPH_DISPLAY_LINKTYPE") {
    return Object.assign({}, state, { [action.linkType]: true });
  } else if (action.type === "REMOVE_NETWORKGRAPH_DISPLAY_LINKTYPE") {
    return Object.assign({}, state, { [action.linkType]: false });
  }
  return state;
}

function entities(state = initialState.entities, action) {
  switch (action.type) {
    case "REQUEST_ENTITY":
      return Object.assign({}, state, { isFetching: true });
    case "RECEIVE_ENTITY":
      return Object.assign({}, state, {
          [action.entityType]: state[action.entityType].concat(action.entity),
          isFetching: false
        });
    default:
      return state;
  }
}

export const combinedReducer = combineReducers({
  networkGraphData,
  displaySetting,
  displayLinkType,
  selectedEntity,
  entities
});
