import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MyPopupDialog = ({
  title,
  message,
  okButtonTitle,
  cancelButtonTitle,
  handleOkClick,
  handleCancelClick,
}) => {
  return (
    <>
      <Modal show={true} onHide={handleCancelClick}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            {cancelButtonTitle ?? "Cancel"}
          </Button>
          <Button variant="primary" onClick={handleOkClick}>
            {okButtonTitle ?? "OK"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyPopupDialog;
