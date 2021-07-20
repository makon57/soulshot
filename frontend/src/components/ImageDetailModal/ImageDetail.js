// import { NavLink } from 'react-router-dom';

const ImageDetail = ({ image }) => {
  return (
    <div>
      <div>
        <img src={image.imageUrl} alt={image.id}></img>
      </div>
      <div>
        <h3>{image.userId}</h3>
        <p>{image.description}</p>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div>
        <button>Comment</button>
      </div>
    </div>
  );
};

export default ImageDetail;
