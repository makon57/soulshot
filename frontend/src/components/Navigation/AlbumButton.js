import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAlbums } from "../../store/albums";
import './Navigation.css';

function AlbumButton({ user }) {

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const albums = Object.values(useSelector((state) => state.album.albums));
  // console.log(albums);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (user) {
      dispatch(fetchAlbums(user));
    }
  }, [dispatch, user]);


  return (
    <div className='album-div'>
      <button onClick={openMenu} className="album-btn">Albums</button>
      {showMenu && (
        <ul className='albumdropdown'>
          {albums.map((album) => (
          <li key={album.id} className="list">
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AlbumButton;
