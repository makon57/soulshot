import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageDetailModal from '../ImageDetailModal'
import { fetchList } from '../../store/albums';
// import { listImages } from '../../store/home';
import '../../components/ImageList/ImageList.css';
import { useParams } from 'react-router-dom';

function AlbumImagesList() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const images = Object.values(useSelector(
    (state) => state.image.images)
    );
  const sortedImages = images.slice(0).reverse();

  useEffect(() => {
    dispatch(fetchList(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="container">
        <ul className="image-list">
        {sortedImages?.map((image) => (
          <li key={image.id} className="item">
            <div className="image-container">
              <ImageDetailModal image={image} className="image"/>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default AlbumImagesList;
