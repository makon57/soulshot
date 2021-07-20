import React from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

// import { deleteImage } from "../../store/image"
import { deleteImage, updateImage } from "../../store/home";



const ImageDetail = ({ image, setShowModal }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  let sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    history.push(`/`);
  }

  sessionUser = useSelector(state => state.session.user.id);

  // const [userId, setUserId] = useState(sessionUser);
  // const [title, setTitle] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [description, setDescription] = useState("");

  const editImage = (e) => {
    e.preventDefault();

    let updatedImage = dispatch(updateImage(image.id));
    if (updatedImage) {
      setShowModal(false);
      history.push(`/`);
    }
  };

  // const saveImage = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     userId,
  //     title,
  //     imageUrl,
  //     description,
  //   }

  //   let updateImage = dispatch(updateImage(payload));
  //   if (updateImage) {
  //     setShowModal(false);
  //   }
  // };

  const deletingImage = async (e) => {
    e.preventDefault();

    let deletedImage = dispatch(deleteImage(image.id));
    if (deletedImage) {
      setShowModal(false);
      history.push(`/`);
    }
  }

  return (
    <div>
      <div>
        <img src={image.imageUrl} alt={image.id}></img>
      </div>
      <div>
        <h2>{image?.title}</h2>
        <h3>{image.username}</h3>
        <p>{image.description}</p>
      </div>
      <div>
        {(!showEditImage && image.captured) && (
          <button onClick={() => setShowEditImage(true)}>Edit</button>
        )}
      </div>
      <div>
        <button onClick={deletingImage}>Delete</button>
      </div>
    </div>
  );
};

export default ImageDetail;
