import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageDetail from './ImageDetail';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteAlbumItem } from '../../store/home';
import './ImageDetail.css';
import AlbumsModal from '../AlbumsModal';

function ImageDetailModal({ image }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async (imageId, albumId) => {
    const payload = {
      imageId,
      albumId
    }

    dispatch(deleteAlbumItem(payload, albumId));
  }

  let content = null;

  if (id) {
    content = (
      <button
        className="trash-btn"
        onClick={() => deleteItem(image.id, id)}>
          <i
            class="far fa-trash-alt"
            onClick={() => deleteItem(image.id, id)}>
          </i>
      </button>
    )
  }

  if (!id) {
    content = (
      <AlbumsModal image={image}/>
    )
  }

  return (
    <>

      <img src={image.imageUrl} alt='' className="image" onClick={() => setShowModal(true)}></img>
      <div className="middle">
        <h4 onClick={() => setShowModal(true)}>{image.title}</h4>
        <p onClick={() => setShowModal(true)}>{image.description}</p>

      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImageDetail image={image} setShowModal={setShowModal}/>
        </Modal>
      )}
      {content}
    </>
  );
}

export default ImageDetailModal;
