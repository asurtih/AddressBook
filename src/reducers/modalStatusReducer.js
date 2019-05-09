import {
  EDIT_ADDRESS,
  CANCEL_EDIT_ADD_ADDRESS,
  REMOVE_ADDRESS,
  CANCEL_REMOVE_ADDRESS,
  ADD_NEW_ADRESS
} from "../actions/addressBook.action";

const initialState = {
  showAddressRemoveConfirmationModal: false,
  showAddressFormModal: false
};

export const modalStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ADDRESS:
      return {
        ...state,
        showAddressFormModal: true
      };
    case CANCEL_EDIT_ADD_ADDRESS:
      return {
        ...state,
        showAddressFormModal: false
      };
    case ADD_NEW_ADRESS:
      return {
        ...state,
        showAddressFormModal: true
      };
    case REMOVE_ADDRESS:
      return {
        ...state,
        showAddressRemoveConfirmationModal: true
      };
    case CANCEL_REMOVE_ADDRESS:
      return {
        ...state,
        showAddressRemoveConfirmationModal: false
      };

    default:
      return state;
  }
};
