import { useState } from "react";
import { useDispatch } from "react-redux";
import { createImage } from "../../store/home"

const ImageInput = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("")
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setUserId("");
    setTitle("");
    setImageUrl("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newImage = {
      userId: {userId},
      title,
      imageUrl,
      description,
    }

    dispatch(createImage(newImage));
    reset();
  };

  return (
    <div className="inputBox">
      <h1>Create Image</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageInput;
