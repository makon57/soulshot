import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums, addToAlbumList } from '../../store/albums';

import AlbumInput from './AlbumInput';
import './AlbumsModal.css';

function Albums({ image }) {
  const dispatch = useDispatch();
  let sessionUser = useSelector(state => state.session.user);

  const [showCreateAlbum, setShowCreateAlbum] = useState(false);

  const albums = Object.values(useSelector((state) => state.album.albums));
  const sortedAlbums = albums.slice(0).reverse();

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

  useEffect(() => {
    setShowCreateAlbum(false);
  }, [image.id]);

 const addImage = async (imageId, albumId, album) => {

    const payload = {
      imageId,
      albumId,
    }

    let addedImage = dispatch(addToAlbumList(payload, albumId));
    if (addedImage) {
      alert(`Image has been added to ${album.title} album.`)
    }
 }

  return (
    <div>
      <ul className="album-list">
      {sortedAlbums.map((album) => (
        <li key={album.id} className="albums">
          <button onClick={() => addImage(image.id, album.id, album)}>{album.title}</button>
        </li>
      ))}
      </ul>
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
