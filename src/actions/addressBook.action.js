import axios from "axios";

export const GET_ADDRESSES = "GET_ADDRESSES";
export const CHANGE_ADDRESS_TYPE_SELECTED = "CHANGE_ADDRESS_TYPE_SELECTED";
export const SET_CURRENT_DEFAULT_ADDR_ID = "SET_CURRENT_DEFAULT_ADDR_ID";
export const CHANGE_DEFAULT_ADDRESS = "CHANGE_DEFAULT_ADDRESS";
export const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export const CANCEL_REMOVE_ADDRESS = "CANCEL_REMOVE_ADDRESS";
export const SAVE_ADDRESS = "SAVE_ADDRESS";
//export const CANCEL_EDIT_ADDRESS = "CANCEL_EDIT_ADDRESS";
export const EDIT_ADDRESS = "EDIT_ADDRESS";
export const ADD_NEW_ADRESS = "ADD_NEW_ADDRESS";
export const CANCEL_EDIT_ADD_ADDRESS = "CANCEL_EDIT_ADD_ADDRESS";
export const CHANGE_SORT_ADDRESS = "CHANGE_SORT_ADDRESS";
export const HANDLE_PAGINATION_PAGE_CHANGE = "HANDLE_PAGINATION_PAGE_CHANGE";
export const HANDLE_PAGINATION_NEXT_PREVIOUS =
  "HANDLE_PAGINATION_NEXT_PREVIOUS";

export const handlePaginationNextPrevious = actionType => ({
  type: HANDLE_PAGINATION_NEXT_PREVIOUS,
  actionType
});
export const handlePaginationPageChange = payload => ({
  type: HANDLE_PAGINATION_PAGE_CHANGE,
  payload
});
export const createChangeSortAddress = payload => ({
  type: CHANGE_SORT_ADDRESS,
  payload
});

export const createNewAddressAction = () => ({
  type: ADD_NEW_ADRESS
});

export const createGetAddressesAction = payload => ({
  type: GET_ADDRESSES,
  payload
});

export const changeAddresstypeSelectionAction = payload => ({
  type: CHANGE_ADDRESS_TYPE_SELECTED,
  payload
});

export const setCurrentDefaultAddrId = payload => ({
  type: SET_CURRENT_DEFAULT_ADDR_ID,
  payload
});

export const removeAddress = payload => ({
  type: REMOVE_ADDRESS,
  payload
});

export const cancelRemoveAddress = payload => ({
  type: CANCEL_REMOVE_ADDRESS,
  payload
});

export const editAddress = payload => ({
  type: EDIT_ADDRESS,
  payload
});

export const cancelEditAddAddress = payload => ({
  type: CANCEL_EDIT_ADD_ADDRESS,
  payload
});

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

function updateCurrentDefaultAddress(currentDefaultAddressId) {
  return axios.patch(
    "http://localhost:3050/addresses/" + currentDefaultAddressId,
    { isPrimary: false }
  );
}

function setDefaultAddress(addressId) {
  return axios.patch("http://localhost:3050/addresses/" + addressId, {
    isPrimary: true
  });
}

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

export const removeAddressData = addressId => {
  return dispatch => {
    axios
      .delete(`http://localhost:3050/addresses/${addressId}`)
      .then(() => {
        dispatch(cancelRemoveAddress());
      })
      .then(() => {
        dispatch(getAddress());
      })
      .catch(error => {});
  };
};

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
