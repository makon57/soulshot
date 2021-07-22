import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchAlbums, addToAlbumList } from '../../store/albums';
import './AlbumsModal.css';
import AlbumInput from './AlbumInput';


function Albums({ image }) {
  const dispatch = useDispatch();
  let sessionUser = useSelector(state => state.session.user);

  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  // const [imageId, setImageId] = useState(image.id);
  // const [albumId, setAlbumId] = useState('');


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

 const addImage = async (imageId, albumId) => {

    const payload = {
      imageId,
      albumId,
    }
    console.log(payload);

    let addedImage = dispatch(addToAlbumList(payload, albumId));
    if ({addedImage}) {
      alert(`Image was added to ${addedImage.title} album.`)
    }
 }

  return (
    <div>
      <div className="container">
        <ul className="image-list">
        {sortedAlbums.map((album) => (
          <li key={album.id} className="albums">
            <button onClick={() => addImage(image.id, album.id)}>{album.title}</button>
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
