import React from "react";
import { Button, Modal } from "react-bootstrap";

const PreviewDetails = (props) => {
  const { formData, showModal } = props || {};
  const detailKeys = formData && Object.keys(formData);
  const renderDetails = () => {
    return detailKeys?.map((field) => {
      const fieldName = field?.charAt(0)?.toUpperCase() + field?.slice(1);
      return (
        <div>
          <span>{field === "company" ? "Company Name" : fieldName}</span>
          <span>{formData[field] || ""}</span>
        </div>
      );
    });
  };

  return (
    <div className="preview-container">
      <Modal
        show={!!showModal}
        onHide={props.onCloseModal}
        className="preview-modal"
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Preview details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="preview-details">{renderDetails()}</div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
};

export default PreviewDetails;
