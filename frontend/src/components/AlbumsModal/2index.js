import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Albums from './Albums';
import '../ImageDetailModal/ImageDetail.css';

function AlbumsModal({ image }) {
  const [showModal, setShowModal] = useState(false);

  let content = null;
  if (!showModal) {
    content = (
      <button
        className="plus-btn"
        onClick={() => setShowModal(true)}>
          <i
            className="fas fa-plus"
            onClick={() => setShowModal(true)}>
          </i>
      </button>
    )
  }

  return (
    <>
      {content}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Albums image={image} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AlbumsModal;
