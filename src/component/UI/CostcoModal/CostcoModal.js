import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./CostcoModal.module.css";
import PropTypes from "prop-types";

export const CostcoModal = ({
  show,
  handleClose,
  handleConfirm,
  titleText,
  children,
  secondaryBtnText,
  primaryBtnText,
  payload,
  showModalFooter
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={styles["modal-header"]}>
        <Modal.Title className={styles["modal-title"]}>{titleText}</Modal.Title>
        <button type="button" className={styles.close} onClick={handleClose}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {showModalFooter ? (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {secondaryBtnText}
          </Button>
          <Button variant="primary" onClick={() => handleConfirm(payload)}>
            {primaryBtnText}
          </Button>
        </Modal.Footer>
      ) : (
        ""
      )}
    </Modal>
  );
};

CostcoModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  titleText: PropTypes.string,
  secondaryBtnText: PropTypes.string,
  primaryBtnText: PropTypes.string,
  payload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showModalFooter: PropTypes.bool
};

CostcoModal.defaultProps = {
  show: false,
  payload: "",
  showModalFooter: true
};
