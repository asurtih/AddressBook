import { CHANGE_SORT_ADDRESS } from "../actions/addressBook.action";

const initialState = {
  sortBy: "firstName",
  sortOrder: "asc"
};

export const sortCriteriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SORT_ADDRESS:
      const values = JSON.parse(action.payload);
      return {
        ...state,
        sortBy: values.sortBy,
        sortOrder: values.orderBy
      };
    default:
      return state;
  }
};
