import React from "react";
import styles from "./AddNewAddressBox.module.css";

import PropTypes from "prop-types";

export const AddNewAddressBox = ({ buttonText, onAddNewAddress }) => {
  return (
    <div
      className={[
        "col-sm-12",
        "col-md-6",
        "col-lg-4",
        "col-xl-3",
        styles.flexOrder
      ].join(" ")}
    >
      <div className={styles.addNewAddressBox}>
        <button
          type="button"
          className="btn btn-link"
          onClick={onAddNewAddress}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

AddNewAddressBox.propTypes = {
  buttonText: PropTypes.string,
  onAddNewAddress: PropTypes.func.isRequired
};

AddNewAddressBox.defaultProps = {
  buttonText: "Add New Address"
};
