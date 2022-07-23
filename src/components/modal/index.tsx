import React from "react";

interface Props {
  title: string;
  closeModal: () => void;
  confirm: () => void;
  children?: JSX.Element|any;
}

const Modal: React.FC<Props> = ({ title, children, closeModal, confirm }) => {
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h6>{title}</h6>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary px-5"
              onClick={confirm}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
