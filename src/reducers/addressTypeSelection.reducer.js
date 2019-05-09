import { CHANGE_ADDRESS_TYPE_SELECTED } from "../actions/addressBook.action";

export const addressTypeSelectionReducer = (state = "S", action) => {
  switch (action.type) {
    case CHANGE_ADDRESS_TYPE_SELECTED:
      return action.payload === "delivery" ? "S" : "B";
    default:
      return state;
  }
};
