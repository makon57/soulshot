import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import AlbumButton from './AlbumButton';

import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UploadFormModal from '../UploadFormModal';

import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../../store/albums";

import './Navigation.css';


function Navigation({ isLoaded }) {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [headerTitle, setHeaderTitle] = useState("SoulShot");

  let sessionLinks;
  let content;

  if (sessionUser) {
    sessionLinks = (
      <div className="login-signup">
        <UploadFormModal />
        <ProfileButton user={sessionUser} />
      </div>
    );
    content = (
      <div>
        <div className="tab">
          <div className="home-btn-div">
            <Link to='/' className="tablinks home-btn" onClick={() => setHeaderTitle('SoulShot')}>Home</Link>
          </div>
          <AlbumButton  user={sessionUser} setHeaderTitle={setHeaderTitle}/>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="login-signup">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }


  useEffect(() => {
    if (sessionUser) {
      dispatch(fetchAlbums(sessionUser));
    }
  }, [dispatch, sessionUser]);


  return (
    <div>
      <div className="nav-div">
        <nav className="home">
          <NavLink exact to='/' className="nav-home" onClick={() => setHeaderTitle('SoulShot')}>Soul<br></br>Shot</NavLink>
          {isLoaded && sessionLinks}
        </nav>
      </div>
      <h2 className="soulshot">{headerTitle}</h2>
      {content}
    </div>
  );
}

export default Navigation;
