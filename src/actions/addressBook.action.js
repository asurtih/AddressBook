import axios from "axios";

export const GET_ADDRESSES = "GET_ADDRESSES";
export const CHANGE_ADDRESS_TYPE_SELECTED = "CHANGE_ADDRESS_TYPE_SELECTED";
export const SET_CURRENT_DEFAULT_ADDR_ID = "SET_CURRENT_DEFAULT_ADDR_ID";
export const CHANGE_DEFAULT_ADDRESS = "CHANGE_DEFAULT_ADDRESS";
export const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export const CANCEL_REMOVE_ADDRESS = "CANCEL_REMOVE_ADDRESS";
export const SAVE_ADDRESS = "SAVE_ADDRESS";
export const EDIT_ADDRESS = "EDIT_ADDRESS";
export const ADD_NEW_ADRESS = "ADD_NEW_ADDRESS";
export const CANCEL_EDIT_ADD_ADDRESS = "CANCEL_EDIT_ADD_ADDRESS";
export const CHANGE_SORT_ADDRESS = "CHANGE_SORT_ADDRESS";
export const HANDLE_PAGINATION_PAGE_CHANGE = "HANDLE_PAGINATION_PAGE_CHANGE";
export const HANDLE_PAGINATION_NEXT_PREVIOUS =
  "HANDLE_PAGINATION_NEXT_PREVIOUS";
export const REMOVE_DEFAULT_ADDRESS = "REMOVE_DEFAULT_ADDRESS";

/**
 * This action will called if we removed a default address
 * It will reset the default address Id to -1
 */
export const handleDefaultAddressRemoval = () => ({
  type: REMOVE_DEFAULT_ADDRESS
});
/**
 * This action is called when Next and Previous pagination link
 * is clicked
 * @param {string} actionType this is to tell which action that user
 * wants either Next Page or Previous Page
 */
export const handlePaginationNextPrevious = actionType => ({
  type: HANDLE_PAGINATION_NEXT_PREVIOUS,
  actionType
});

/**
 * This action is called when pagination link is clicked exclude the next
 * and previous button
 * @param {string} payload selected page number
 */
export const handlePaginationPageChange = payload => ({
  type: HANDLE_PAGINATION_PAGE_CHANGE,
  payload
});

/**
 * This action is called when user select different sorting criteria
 * @param {object} payload contain sortBy and orderBy
 * @param {string} payload.sortBy contains the sorting field name
 * @param {string} payload.orderBy contains the order by string i.e asc or desc
 */
export const createChangeSortAddress = payload => ({
  type: CHANGE_SORT_ADDRESS,
  payload
});

/**
 * This action is called when New Address Button is clicked
 *  it will display the Add new address form
 */
export const createNewAddressAction = () => ({
  type: ADD_NEW_ADRESS
});

//This action is called after the get address service called is invoke
/**
 * //This action is called after the get address service called is invoke
 * @param {addresses} payload List of addresses
 */
export const createGetAddressesAction = payload => ({
  type: GET_ADDRESSES,
  payload
});

/**
 * This action is called when Address Type selection is clicked
 * @param {string} payload either "billing" or "delivery"
 */
export const changeAddresstypeSelectionAction = payload => ({
  type: CHANGE_ADDRESS_TYPE_SELECTED,
  payload
});

/**
 * This action is called when set default address button is clicked
 * @param {string} payload the id of default address
 */
export const setCurrentDefaultAddrId = payload => ({
  type: SET_CURRENT_DEFAULT_ADDR_ID,
  payload
});

/**
 * This action will display the address removal confirmation
 * modal window and set the selectedAddress id to the id of the address
 * to be removed
 * @param {string} payload the id of the address
 */
export const removeAddress = payload => ({
  type: REMOVE_ADDRESS,
  payload
});

/**
 * This action will reset the  selected address id to empty
 *  and close the remove address confirmation modal window
 */
export const cancelRemoveAddress = () => ({
  type: CANCEL_REMOVE_ADDRESS
});

/**
 * This action will display the edit address modal window
 * @param {string} payload the id of the address to be edited
 */
export const editAddress = payload => ({
  type: EDIT_ADDRESS,
  payload
});

/**
 * This action will reset the  selected address id to empty
 * and close the edit and new address form modal window
 */
export const cancelEditAddAddress = () => ({
  type: CANCEL_EDIT_ADD_ADDRESS
});

/**
 * async method to get the list of all addresses and set the state
 * with list of addresses
 */
export const getAddress = () => {
  return dispatch => {
    axios
      .get("http://localhost:3050/addresses")
      .then(response => {
        dispatch(createGetAddressesAction(response.data));
      })
      .catch(error => {});
  };
};

/**
 * async method to update the isPrimary flag to false of the previous default address
 * @param {*} currentDefaultAddressId the id of the previous default address
 */
function updateCurrentDefaultAddress(currentDefaultAddressId) {
  return currentDefaultAddressId !== -1
    ? axios.patch(
        "http://localhost:3050/addresses/" + currentDefaultAddressId,
        { isPrimary: false }
      )
    : null;
}

/**
 * async method to update the isPrimary flag to true for the current selected address
 * @param {*} addressId The id of the currently selected address
 */
function setDefaultAddress(addressId) {
  return axios.patch("http://localhost:3050/addresses/" + addressId, {
    isPrimary: true
  });
}

/**
 * async method that will update the isPrimary flag for both the previous
 *  default address and current default address and refresh the address list
 * @param {*} currentDefaultAddressId the id of the previous default address
 * @param {*} addressId the id of the current selected address
 */
export const changeDefaultAddress = (currentDefaultAddressId, addressId) => {
  return dispatch => {
    axios
      .all([
        updateCurrentDefaultAddress(currentDefaultAddressId),
        setDefaultAddress(addressId)
      ])
      .then(() => {
        dispatch(getAddress());
      })
      .then(() => {
        dispatch(setCurrentDefaultAddrId(addressId));
      })
      .catch(error => {});
  };
};

/**
 * async method to remove address when remove address button in the
 *  remove address modal window is clicked and refresh the list of addresses
 * @param {*} addressId selected address id
 */
export const removeAddressData = addressId => {
  return (dispatch, getState) => {
    const state = getState();
    const removedAddress = state.addresses.find(address => {
      return address.id === addressId;
    });
    axios
      .delete(`http://localhost:3050/addresses/${addressId}`)
      .then(() => {
        dispatch(cancelRemoveAddress());
        if (removedAddress.isPrimary) {
          dispatch(handleDefaultAddressRemoval());
        }
      })
      .then(() => {
        dispatch(getAddress());
      })
      .catch(error => {});
  };
};

/**
 * async method that is called when save address button is clicked
 * in the edit address form modal window
 * @param {object} address the edited address data
 * @param {string} address.id The id of the address
 * @param {string} address.firstName The firstName of the address
 * @param {string} address.lastName The lastName of the address
 * @param {string} address.email The email of the address
 * @param {string} address.addressLine1 The street address of the address
 * @param {string} address.state The state of the address
 * @param {string} address.city The city of the address
 * @param {string} address.zipCode The zipcode of the address
 * @param {string} address.phone The phone number of the address
 */
export const replaceAddressData = address => {
  console.log(address);
  return dispatch => {
    axios
      .put(`http://localhost:3050/addresses/${address.id}`, address)
      .then(() => {
        dispatch(getAddress());
      })
      .then(() => {
        dispatch(cancelEditAddAddress());
      })
      .catch(error => {});
  };
};

/**
 * async method that is called when save address button is clicked
 * in the new address form modal window
 * @param {object} address the edited address data
 * @param {string} address.firstName The firstName of the address
 * @param {string} address.lastName The lastName of the address
 * @param {string} address.email The email of the address
 * @param {string} address.addressLine1 The street address of the address
 * @param {string} address.state The state of the address
 * @param {string} address.city The city of the address
 * @param {string} address.zipCode The zipcode of the address
 * @param {string} address.phone The phone number of the address
 * @param {string} address.isPrimary This is set to false initially
 * @param {string} address.addressType The type of address i.e shipping or billing
 */
export const addNewAddress = address => {
  return dispatch => {
    axios
      .post("http://localhost:3050/addresses", address)
      .then(() => {
        dispatch(getAddress());
      })
      .then(() => {
        dispatch(cancelEditAddAddress());
      })
      .catch(error => {});
  };
};
