import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from 'react-router-dom';
import './ImageDetail.css';

import { deleteImage } from "../../store/home";
import ImageList from "../ImageList";
import EditImage from "./EditImages";



const ImageDetail = ({ image, setShowModal }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  let sessionUser = useSelector(state => state.session.user);

  const [showEditImage, setShowEditImage] = useState(false);

  const collect = (e) => {
    e.preventDefault();
  }

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
    ;
  } else if (sessionUser.id === image.userId) {
    content = (
      <div>
        <div>
          <button className="collect-btn" onClick={collect}>Collect</button>
        </div>
        <div>
          {(!showEditImage) && (
            <button className="edit-btn" onClick={() => setShowEditImage(true)}>Edit</button>
          )}
        </div>
        <div>
          {content}
        </div>
        <div>
          <button className="delete-btn" onClick={deletingImage}>Delete</button>
        </div>
      </div>
    )
  }

  return (
    <div className="holder">
      <div className="image-container">
        <img src={image.imageUrl} alt={image.id}></img>
      </div>
      <div className="information">
        <h4>{image.title}</h4>
        <h3>{image.userId.username}</h3>
        <p>{image.description}</p>
      </div>
      {content}
      <div>
        <br></br>
      </div>
    </div>
  );
};

export default ImageDetail;
