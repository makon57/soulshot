import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageDetail from './ImageDetail';
import './ImageDetail.css';

function ImageDetailModal({ image }) {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img src={image.imageUrl} alt='' className="image" onClick={() => setShowModal(true)}></img>
      <div class="middle">
        <p class="text" onClick={() => setShowModal(true)}>{image.description}</p>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImageDetail image={image}/>
        </Modal>
      )}
    </>
  );
}

export default ImageDetailModal;
