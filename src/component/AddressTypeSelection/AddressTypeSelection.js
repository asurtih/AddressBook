import React from "react";
import styles from "./AddressTypeSelection.module.css";

export const AddressTypeSelection = ({
  onDeliveryAddressSelect,
  onBillingAddressSelect,
  addressTypeSelected
}) => {
  return (
    <div className="col-sm-12 col-lg-6">
      <div className={styles.table}>
        <div className={styles["table-row"]}>
          <div
            className={[
              styles["table-cell"],
              addressTypeSelected === "S" ? styles.active : ""
            ].join(" ")}
          >
            <button
              id="delivery"
              type="button"
              onClick={e => onDeliveryAddressSelect(e.target.id)}
              className="btn btn-link"
            >
              Delivery
            </button>
          </div>
          <div
            className={[
              styles["table-cell"],
              addressTypeSelected === "B" ? styles.active : ""
            ].join(" ")}
          >
            <button
              type="button"
              id="billing"
              onClick={e => onBillingAddressSelect(e.target.id)}
              className="btn btn-link"
            >
              Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
