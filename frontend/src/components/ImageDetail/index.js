import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageDetail from './ImageDetail';


function ImageDetailModal({ image }) {
  const [showModal, setShowModal] = useState(false);
  console.log(image);

  

  return (
    <>
      <img src={image.imageUrl} alt='' className="image-detail" onClick={() => setShowModal(true)}></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImageDetail />
        </Modal>
      )}
    </>
  );
}

export default ImageDetailModal;
