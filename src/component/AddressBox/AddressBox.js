import React, { useEffect } from "react";
import styles from "./AddressBox.module.css";
import * as stringConst from "../../Assets/stringConstant/stringConstant";
import PropTypes from "prop-types";
/**
 *  Display individual address
 *
 * @param {props} {
 *   address,
 *   addressTypeSelected,
 *   currentDefaultAddrId,
 *   setCurrentDefaultAddrId,
 *   onSetDefaultAddress,
 *   onRemoveAddress,
 *   onEditAddress
 * }
 * @returns JSX element that display each individual address
 */
export const AddressBox = ({
  address,
  addressTypeSelected,
  currentDefaultAddrId,
  setCurrentDefaultAddrId,
  onSetDefaultAddress,
  onRemoveAddress,
  onEditAddress
}) => {
  useEffect(() => {
    if (address.isPrimary) {
      setCurrentDefaultAddrId(address.id);
    }
  }, []);

  const customerName = [
    address.firstName,
    address.middleName,
    address.lastName
  ].join(" ");

  let addressBoxHeaderText = "";

  if (addressTypeSelected === "S") {
    if (address.isPrimary) {
      addressBoxHeaderText = stringConst.DEFAULT_DELIVERY_ADDRESS;
    } else {
      addressBoxHeaderText = stringConst.SET_DEFAULT_DELIVERY_ADDRESS;
    }
  } else {
    if (address.isPrimary) {
      addressBoxHeaderText = stringConst.DEFAULT_BILING_ADDRESS;
    } else {
      addressBoxHeaderText = stringConst.SET_DEFAULT_BILLING_ADDRESS;
    }
  }

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
      <div className={styles.addressBox}>
        <div
          className={[
            styles.setDefaultAddress,
            address.isPrimary ? styles.default : ""
          ].join(" ")}
        >
          {address.isPrimary ? (
            <span>{addressBoxHeaderText}</span>
          ) : (
            <button
              type="button"
              disabled={address.isPrimary ? "disabled" : ""}
              className="btn btn-link"
              onClick={() =>
                onSetDefaultAddress(currentDefaultAddrId, address.id)
              }
            >
              {addressBoxHeaderText}
            </button>
          )}
        </div>
        <div className={styles.addressListBox}>
          <span className="d-block">{customerName}</span>
          <span className="d-block">{address.addressLine1}</span>
          <span className="d-block">
            {[address.city, ", ", address.state, " ", address.zipCode].join("")}
          </span>
          <span className="d-block">{address.phone}</span>
          <span className="d-block">{address.email}</span>
        </div>

        <div className={styles.addressBoxButtonRow}>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => onEditAddress(address.id)}
          >
            {stringConst.EDIT}
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => onRemoveAddress(address.id)}
          >
            {stringConst.REMOVE}
          </button>
        </div>
      </div>
    </div>
  );
};

AddressBox.propTypes = {
  address: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    addressLine1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    isPrimary: PropTypes.bool,
    addressType: PropTypes.string
  }).isRequired,
  addressTypeSelected: PropTypes.string.isRequired,
  currentDefaultAddrId: PropTypes.number.isRequired,
  setCurrentDefaultAddrId: PropTypes.func.isRequired,
  onSetDefaultAddress: PropTypes.func.isRequired,
  onRemoveAddress: PropTypes.func.isRequired,
  onEditAddress: PropTypes.func.isRequired
};
