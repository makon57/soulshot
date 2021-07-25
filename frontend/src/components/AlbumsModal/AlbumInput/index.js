import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAlbum } from "../../../store/albums";
import { useHistory } from 'react-router-dom';
import '../AlbumsModal.css';

const AlbumInput = ({ hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    history.push(`/`);
  }

  sessionUser = useSelector(state => state.session.user.id);

  const [userId, setUserId] = useState(sessionUser);
  const [title, setTitle] = useState("");


  const reset = () => {
    setUserId(sessionUser);
    setTitle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId,
      title,
    }

    let newAlbum = dispatch(createAlbum(payload));
    if (newAlbum) {
      hideForm(() => false);
      reset();
    }
  };

  return (
    <div className="inputBox">
      <h1>Create Album</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          name="title"
        />
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AlbumInput;
