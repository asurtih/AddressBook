import React, { useEffect } from "react";
import { AddNewAddressBox } from "./AddNewAddressBox/AddNewAddressBox";
import { AddressBox } from "./AddressBox/AddressBox";
import { ConfirmationModalContent } from "../component/ConfirmationModalContent/ConfirmationModalContent";
import styles from "./AddressBook.module.css";
import { AddressTypeSelection } from "./AddressTypeSelection/AddressTypeSelection";
import * as stringConst from "../Assets/stringConstant/stringConstant";
import { CostcoModal } from "../component/UI/CostcoModal/CostcoModal";
import { AddressForm } from "../component/AddressForm/AddressForm";
import { CostcoPagination } from "../component/UI/CostcoPagination/CostcoPagination";
import { AddressSort } from "../component/AddressSort/AddressSort";
import _ from "lodash";
import { paginate } from "../Utility/utility";

export const AddressBook = ({
  onGetAddresses: getAddresses,
  addresses,
  onDeliveryAddressSelect,
  onBillingAddressSelect,
  addressTypeSelected,
  defaultCurrentAddrhandler,
  currentDefaultAddrId,
  onSetDefaultAddress,
  onRemoveAddress,
  onCancelRemoveAddress,
  modalStatus,
  onRemoveAddressData,
  selectedAddressId,
  onEditAddress,
  onCancelEditAddAddress,
  onSaveAddress,
  onAddNewAddress,
  onSaveNewAddress,
  sortCriteria,
  onChangeSortCriteria,
  paginationData,
  onPaginationPageChange,
  onPaginationNextPrevious
}) => {
  //You can pass the special value of empty array []
  //as a way of saying “only run on mount and unmount”.
  useEffect(() => {
    getAddresses();
  }, []);

  let addressFormTitle = "";

  //if the selected address id is present
  //then user click the edit button
  //otherwise the user click the add new address button
  if (selectedAddressId !== -1) {
    addressFormTitle =
      addressTypeSelected === "S"
        ? stringConst.EDIT_SHIPPING_ADDRESS
        : stringConst.EDIT_BILLING_ADDRESS;
  } else {
    addressFormTitle = stringConst.ADD_NEW_ADDRESS;
  }

  //initialize total count and final address to be displayed
  let totalCount = 0;
  let finalAddress = [];

  if (addresses) {
    //need to filtered address by addresstypeselected
    const filteredAddresses = addressTypeSelected
      ? addresses.filter(address => address.addressType === addressTypeSelected)
      : addresses;

    //sort address by selected sort criteria but default address always first
    const sortedAddresses = _.orderBy(
      filteredAddresses,
      ["isPrimary", sortCriteria.sortBy],
      ["desc", sortCriteria.sortOrder]
    );

    //get a list of address to be disaplayed based on
    //page size and current page
    finalAddress = paginate(
      sortedAddresses,
      paginationData.currentPage,
      paginationData.pageSize
    );

    totalCount = filteredAddresses.length;
  }

  return (
    <>
      <div className="row">
        <AddressTypeSelection
          onDeliveryAddressSelect={onDeliveryAddressSelect}
          onBillingAddressSelect={onBillingAddressSelect}
          addressTypeSelected={addressTypeSelected}
        />
      </div>

      <AddressSort
        onChangeSortCriteria={onChangeSortCriteria}
        totalCount={totalCount}
        pageSize={paginationData.pageSize}
        currentPage={paginationData.currentPage}
      />

      <div className={styles.addressBox}>
        <div className={styles.flex_container}>
          <AddNewAddressBox onAddNewAddress={onAddNewAddress} />

          {finalAddress.map(address => (
            <AddressBox
              key={address.id}
              address={address}
              addressTypeSelected={addressTypeSelected}
              currentDefaultAddrId={currentDefaultAddrId}
              setCurrentDefaultAddrId={defaultCurrentAddrhandler}
              onSetDefaultAddress={onSetDefaultAddress}
              onRemoveAddress={onRemoveAddress}
              onEditAddress={onEditAddress}
            />
          ))}
        </div>
      </div>
      <div className="row">
        <CostcoPagination
          itemsCount={totalCount}
          pageSize={paginationData.pageSize}
          onPageChange={onPaginationPageChange}
          currentPage={paginationData.currentPage}
          maxLink={paginationData.maxLink}
          onHandleNext={onPaginationNextPrevious}
          onHandlePrevious={onPaginationNextPrevious}
        />
      </div>
      {/* This is remove address confirmation modal */}
      <CostcoModal
        show={modalStatus.showAddressRemoveConfirmationModal}
        titleText={stringConst.REMOVE_ADDRESS}
        primaryBtnText={stringConst.REMOVE}
        secondaryBtnText={stringConst.CANCEL}
        handleClose={onCancelRemoveAddress}
        payload={selectedAddressId}
        handleConfirm={onRemoveAddressData}
      >
        <ConfirmationModalContent
          confirmationText={stringConst.REMOVE_ADDRESS_CONFIRMATION_TEXT}
        />
      </CostcoModal>

      {/* This is edit or new address modal */}
      <CostcoModal
        show={modalStatus.showAddressFormModal}
        titleText={addressFormTitle}
        handleClose={onCancelEditAddAddress}
        payload={selectedAddressId}
        showModalFooter={false}
      >
        <AddressForm
          address={
            selectedAddressId !== -1
              ? addresses.find(address => {
                  return address.id === selectedAddressId;
                })
              : ""
          }
          onSaveAddress={
            selectedAddressId !== -1 ? onSaveAddress : onSaveNewAddress
          }
          handleCancel={onCancelEditAddAddress}
          addressTypeSelected={addressTypeSelected}
        />
      </CostcoModal>
    </>
  );
};
