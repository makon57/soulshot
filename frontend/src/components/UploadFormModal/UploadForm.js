import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createImage } from "../../store/home"
import { useHistory } from 'react-router-dom';
import './UploadForm.css';



const UploadForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    history.push(`/`);
  }

  sessionUser = useSelector(state => state.session.user.id);

  const [created, setCreated] = useState(false);
  const [userId, setUserId] = useState(sessionUser);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setUserId(sessionUser);
    setTitle("");
    setImageUrl("");
    setDescription("");
    setCreated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId,
      title,
      imageUrl,
      description,
    }

    let createdImage = dispatch(createImage(payload));
    if (createdImage) {
      setCreated(true);
      setShowModal(false);
      reset();
    }
  };

  return (
    <div className="inputBox">
      <h1>Create Image</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          name="title"
        />
        <input
          type="text"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder="Image URL"
          name="imageUrl"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="Add your story"
        ></textarea>
        <button type="submit" value={created} >Submit</button>
      </form>
      {/* <div className='confirmation'>
        <h2>Thank you for sharing!</h2>
      </div> */}
    </div>
  );
};

export default UploadForm;
