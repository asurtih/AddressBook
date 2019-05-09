import { addressesReducer } from "../reducers/addresses.reducer";
import { addressTypeSelectionReducer } from "../reducers/addressTypeSelection.reducer";
import { defaultAddressReducer } from "../reducers/defaultAddress.reducer";
import { modalStatusReducer } from "../reducers/modalStatusReducer";
import { selectedAddressIdReducer } from "../reducers/selectedAddressIdReducer";
import { sortCriteriaReducer } from "../reducers/sortCriteria.reducer";
import { paginationDataReducer } from "../reducers/paginationDataReducer";

export const addressBookReducer = (state = {}, action) => {
  return {
    ...state,
    addresses: addressesReducer(state.addresses, action),
    addressTypeSelected: addressTypeSelectionReducer(
      state.addressTypeSelected,
      action
    ),
    currentDefaultAddrId: defaultAddressReducer(
      state.currentDefaultAddrId,
      action
    ),
    modalStatus: modalStatusReducer(state.modalStatus, action),
    selectedAddressId: selectedAddressIdReducer(
      state.selectedAddressId,
      action
    ),
    sortCriteria: sortCriteriaReducer(state.sortCriteria, action),
    paginationData: paginationDataReducer(state.paginationData, action)
  };
};
