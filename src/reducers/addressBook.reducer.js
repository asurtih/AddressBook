import { addressesReducer } from "../reducers/addresses.reducer";
import { addressTypeSelectionReducer } from "../reducers/addressTypeSelection.reducer";
import { defaultAddressReducer } from "../reducers/defaultAddress.reducer";
import { modalStatusReducer } from "../reducers/modalStatusReducer";
import { selectedAddressIdReducer } from "../reducers/selectedAddressIdReducer";
import { sortCriteriaReducer } from "../reducers/sortCriteria.reducer";
import { paginationDataReducer } from "../reducers/paginationDataReducer";

/**
 *
 * @param {object} state the state
 * @param {Array} state.addresses the list of address
 * @param {string} state.addressTypeSelected the type of address selected
 * @param {string} state.currentDefaultAddrId the id of the current default address
 * @param {object} state.modalStatus the status of different modal window (open or close)
 * @param {boolean} state.modalStatus.showAddressRemoveConfirmationModal the status of address remove confirmation modal
 * @param {boolean} state.modalStatus.showAddressFormModal the status of new and edit address form modal
 * @param {string} state.selectedAddressId the id of the currently selected address
 * @param {object} state.sortCriteria the sorting criteria
 * @param {string} state.sortCriteria.sortBy the field name to be sorted
 * @param {string} state.sortCriteria.sortOrder either asc or desc
 * @param {object} state.paginationData the data about current state of pagination
 * @param {Number} state.paginationData.pageSize the number of items per page
 * @param {Number} state.paginationData.currentPage the current page number
 * @param {Number} state.paginationData.maxLink the maximum number of pagination link to displayed
 * @param {string} action the action
 */
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
