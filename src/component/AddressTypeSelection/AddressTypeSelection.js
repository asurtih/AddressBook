import React from "react";
import globalStyles from "../../Assets/bootstrap.min.module.css";

import styles from "./AddressTypeSelection.module.css";

export const AddressTypeSelection = ({
  onDeliveryAddressSelect,
  onBillingAddressSelect,
  addressTypeSelected
}) => {
  return (
    <div
      className={[globalStyles["col-sm-12"], globalStyles["col-lg-6"]].join(
        " "
      )}
    >
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
              className={[globalStyles.btn, globalStyles["btn-link"]].join(" ")}
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
              className={[globalStyles.btn, globalStyles["btn-link"]].join(" ")}
            >
              Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
