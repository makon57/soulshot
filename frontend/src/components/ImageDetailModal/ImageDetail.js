import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './ImageDetail.css';

// import { deleteImage } from "../../store/image"
import { deleteImage } from "../../store/home";
import ImageList from "../ImageList";
import EditImage from "./EditImages";



const ImageDetail = ({ image, setShowModal }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  let sessionUser = useSelector(state => state.session.user);

  const [showEditImage, setShowEditImage] = useState(false);

  useEffect (() => {
    setShowEditImage(false);
  }, [image.id]);

  let content = null;

  if (showEditImage && sessionUser) {
    content = (
      <EditImage image={image} hideForm={() => setShowEditImage(false)} />
    )
  }

  const deletingImage = async (e) => {
    e.preventDefault();

    let deletedImage = dispatch(deleteImage(image.id));
    if (deletedImage) {
      setShowModal(false);
      history.push(<ImageList />);
    }
  }

  if (!sessionUser) {
    history.push(`/`);
  }

  if (sessionUser.id === image.userId) {
    content = (
      <div>
        <div>
          {(!showEditImage) && (
            <button onClick={() => setShowEditImage(true)}>Edit</button>
          )}
        </div>
        <div>
          {content}
        </div>
        <div>
          <button onClick={deletingImage}>Delete</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <img src={image.imageUrl} alt={image.id}></img>
      </div>
      <div>
        <h3>{image.title}</h3>
        <h3>{image.username}</h3>
        <p>{image.description}</p>
      </div>
      {content}
    </div>
  );
};

export default ImageDetail;
