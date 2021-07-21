import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editImage } from '../../../store/home';
import './EditForm.css';

const EditImage = ({ image, hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    history.push(`/`);
  }

  sessionUser = useSelector(state => state.session.user.id);

  const [userId, setUserId] = useState(sessionUser);
  const [title, setTitle] = useState(image.title);
  const [imageUrl, setImageUrl] = useState(image.imageUrl);
  const [description, setDescription] = useState(image.description);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const reset = () => {
    setUserId(sessionUser);
    setTitle(image.title);
    setImageUrl(image.imageUrl);
    setDescription(image.description);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...image,
      userId,
      title,
      imageUrl,
      description,
    };

    let updatedImage = dispatch(editImage(image.id, payload))
    if (updatedImage) {
      hideForm();
      reset();
    }
  };



  return (
    <section className="edit-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle} />
        <input
          type="imageUrl"
          placeholder="ImageUrl"
          required
          value={imageUrl}
          onChange={updateImageUrl} />
        <textarea
          type="description"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />
        <button className="update-btn" type="submit">Update Item</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default EditImage;
