import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getAddress,
  changeAddresstypeSelectionAction,
  setCurrentDefaultAddrId,
  changeDefaultAddress,
  removeAddress,
  cancelRemoveAddress,
  removeAddressData,
  editAddress,
  cancelEditAddAddress,
  replaceAddressData,
  createNewAddressAction,
  addNewAddress,
  createChangeSortAddress,
  handlePaginationPageChange,
  handlePaginationNextPrevious
} from "../actions/addressBook.action";
import { AddressBook } from "../component/AddressBook";

const mapStateToProps = state => {
  return {
    currentDefaultAddrId: state.currentDefaultAddrId,
    addresses: state.addresses,
    addressTypeSelected: state.addressTypeSelected,
    modalStatus: state.modalStatus,
    selectedAddressId: state.selectedAddressId,
    sortCriteria: state.sortCriteria,
    paginationData: state.paginationData
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onGetAddresses: getAddress,
      onDeliveryAddressSelect: changeAddresstypeSelectionAction,
      onBillingAddressSelect: changeAddresstypeSelectionAction,
      defaultCurrentAddrhandler: setCurrentDefaultAddrId,
      onSetDefaultAddress: changeDefaultAddress,
      onRemoveAddress: removeAddress,
      onCancelRemoveAddress: cancelRemoveAddress,
      onRemoveAddressData: removeAddressData,
      onEditAddress: editAddress,
      onCancelEditAddAddress: cancelEditAddAddress,
      onSaveAddress: replaceAddressData,
      onAddNewAddress: createNewAddressAction,
      onSaveNewAddress: addNewAddress,
      onChangeSortCriteria: createChangeSortAddress,
      onPaginationPageChange: handlePaginationPageChange,
      onPaginationNextPrevious: handlePaginationNextPrevious
    },
    dispatch
  );

export const AddressBookContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBook);
