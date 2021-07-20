import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import ImageDetailModal from '../ImageDetailModal'
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
            <ImageDetailModal image={image}/>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default ImageList;
