import {
  HANDLE_PAGINATION_PAGE_CHANGE,
  SET_CURRENT_DEFAULT_ADDR_ID,
  HANDLE_PAGINATION_NEXT_PREVIOUS,
  CHANGE_ADDRESS_TYPE_SELECTED
} from "../actions/addressBook.action";

const initialState = {
  pageSize: 7,
  currentPage: 1,
  maxLink: 5
};
export const paginationDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_PAGINATION_PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case SET_CURRENT_DEFAULT_ADDR_ID:
      return {
        ...state,
        currentPage: 1
      };
    case HANDLE_PAGINATION_NEXT_PREVIOUS:
      return {
        ...state,
        currentPage:
          action.actionType === "Next"
            ? state.currentPage + 1
            : state.currentPage - 1
      };
    case CHANGE_ADDRESS_TYPE_SELECTED:
      return {
        ...state,
        currentPage: 1
      };
    default:
      return state;
  }
};
