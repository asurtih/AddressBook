import {
  EDIT_ADDRESS,
  CANCEL_EDIT_ADD_ADDRESS,
  REMOVE_ADDRESS,
  CANCEL_REMOVE_ADDRESS
} from "../actions/addressBook.action";

export const selectedAddressIdReducer = (state = "", action) => {
  switch (action.type) {
    case REMOVE_ADDRESS:
      return action.payload;
    case CANCEL_REMOVE_ADDRESS:
      return "";
    case EDIT_ADDRESS:
      return action.payload;
    case CANCEL_EDIT_ADD_ADDRESS:
      return "";
    default:
      return state;
  }
};
