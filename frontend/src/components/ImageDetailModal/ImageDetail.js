import React from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

// import { deleteImage } from "../../store/image"
import { deleteImage } from "../../store/home"



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

  // const editImage = (e) => {
  //   e.preventDefault();


  // };

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

  const deleteImage = async (e) => {
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
        <h3>{image.username}</h3>
        <p>{image.description}</p>
      </div>
      <div>
        {/* <button onClick={editImage}>Edit</button>
        <button onClick={saveImage}>Save</button> */}
        <button onClick={deleteImage}>Delete</button>
      </div>
      <div>
        <button>Comment</button>
      </div>
    </div>
  );
};

export default ImageDetail;
