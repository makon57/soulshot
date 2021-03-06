import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageDetailModal from '../ImageDetailModal'
import { fetchImages } from '../../store/home';
import './ImageList.css';
import Footer from '../Footer';

function ImageList() {
  const dispatch = useDispatch();
  const images = Object.values(useSelector((state) => state.image.images));
  const sortedImages = images.slice(0).reverse();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <div>
      <div className="container">
        <ul className="image-list">
        {sortedImages.map((image) => (
          <li key={image.id} className="item">
            <div className="image-container">
              <ImageDetailModal image={image} className="image"/>
            </div>
          </li>
        ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default ImageList;
