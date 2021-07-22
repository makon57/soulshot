import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Albums from './Albums';
import '../ImageDetailModal/ImageDetail.css';

function AlbumsModal({ image }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="collect-btn" onClick={() => setShowModal(true)}>Collect</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Albums image={image} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AlbumsModal;
