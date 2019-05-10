import {
  SET_CURRENT_DEFAULT_ADDR_ID,
  CHANGE_ADDRESS_TYPE_SELECTED,
  REMOVE_DEFAULT_ADDRESS
} from "../actions/addressBook.action";

export const defaultAddressReducer = (state = -1, action) => {
  switch (action.type) {
    case SET_CURRENT_DEFAULT_ADDR_ID:
      return action.payload;
    case CHANGE_ADDRESS_TYPE_SELECTED:
      return -1;
    case REMOVE_DEFAULT_ADDRESS:
      return -1;
    default:
      return state;
  }
};
