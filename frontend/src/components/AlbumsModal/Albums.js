import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { fetchAlbums } from '../../store/albums';
import './AlbumsModal.css';
import AlbumInput from './AlbumInput';

function Albums({ image }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  let sessionUser = useSelector(state => state.session.user);

  const [showCreateAlbum, setShowCreateAlbum] = useState(false);


  const albums = Object.values(useSelector((state) => state.album.albums));
  const sortedAlbums = albums.slice(0).reverse();

  useEffect (() => {
    setShowCreateAlbum(false);
  }, [image.id]);

  let content = null;
  if (showCreateAlbum && sessionUser) {
    content = (
      <AlbumInput hideForm={() => setShowCreateAlbum(false)} />
    )
  }

  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchAlbums(sessionUser));
    }
  }, [dispatch, sessionUser]);

  return (
    <div>
      <div className="container">
        <ul className="image-list">
        {sortedAlbums.map((album) => (
          <li key={album.id} className="item">
            {album.title}
          </li>
        ))}
        </ul>
      </div>
      {content}
      <div>
        {(!showCreateAlbum) && (
          <button className="create-btn" onClick={() => setShowCreateAlbum(true)}>Create New Album</button>
        )}
      </div>
    </div>
  );
}

export default Albums;
