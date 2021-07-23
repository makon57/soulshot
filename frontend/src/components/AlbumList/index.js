import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageDetailModal from '../ImageDetailModal'
import { listImages } from '../../store/home';
import { deleteAlbum } from '../../store/albums';
import '../../components/ImageList/ImageList.css';
import { useHistory, useParams } from 'react-router-dom';

function AlbumImagesList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const images = Object.values(useSelector(
    (state) => state.image.images)
    );
  const sortedImages = images.slice(0).reverse();

  const albumDelete = () => {
    dispatch(deleteAlbum(id));
    history.push(`/`)
  }

  useEffect(() => {
    dispatch(listImages(id));
  }, [dispatch, id]);

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
      <button className="delete-album-btn" onClick={albumDelete}>Delete Album</button>
    </div>
  );
}

export default AlbumImagesList;
