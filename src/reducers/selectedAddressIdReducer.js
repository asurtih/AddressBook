import {
  EDIT_ADDRESS,
  CANCEL_EDIT_ADD_ADDRESS,
  REMOVE_ADDRESS,
  CANCEL_REMOVE_ADDRESS
} from "../actions/addressBook.action";

export const selectedAddressIdReducer = (state = -1, action) => {
  switch (action.type) {
    case REMOVE_ADDRESS:
      return action.payload;
    case CANCEL_REMOVE_ADDRESS:
      return -1;
    case EDIT_ADDRESS:
      return action.payload;
    case CANCEL_EDIT_ADD_ADDRESS:
      return -1;
    default:
      return state;
  }
};
