import {
  SET_CURRENT_DEFAULT_ADDR_ID,
  CHANGE_ADDRESS_TYPE_SELECTED
} from "../actions/addressBook.action";

export const defaultAddressReducer = (state = "", action) => {
  switch (action.type) {
    case SET_CURRENT_DEFAULT_ADDR_ID:
      return action.payload;
    case CHANGE_ADDRESS_TYPE_SELECTED:
      return "";
    default:
      return state;
  }
};
