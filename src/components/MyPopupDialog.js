import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyPopupDialog = ({title,message,handleOkClick,handleCancelClick}) => {
 
  return (
    <>   
      <Modal  show={true} onHide={handleCancelClick}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOkClick}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyPopupDialog;
