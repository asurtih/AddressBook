import { GET_ADDRESSES } from "../actions/addressBook.action";

export const addressesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ADDRESSES:
      return action.payload;
    default:
      return state;
  }
};
