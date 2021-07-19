import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../store/home';
import './ImageList.css';

function ImageList() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <div>
      <div>
          <h2>SoulShot</h2>
      </div>
      <div className="container">
        <ul className="image-list">
        {images?.map((image) => (
          <li key={image.imageUrl} className="item">
            <img src={image.imageUrl} alt=''></img>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageList;