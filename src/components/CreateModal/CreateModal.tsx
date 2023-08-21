import React from 'react';
import './CreateModal.scss'

type Props = {
  onClose: () => void;
};

export const CreateModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="createModal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
};