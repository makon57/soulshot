import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadForm from './UploadForm';


function UploadFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="home-upload" onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UploadFormModal;
