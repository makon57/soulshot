import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import AlbumButton from './AlbumButton';

import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UploadFormModal from '../UploadFormModal';

import './Navigation.css';



function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

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
          <Link to='/' className="tablinks home-btn">Home</Link>
          <AlbumButton  user={sessionUser} />
        </div>

        <div className="tabcontent">
          <h3>London</h3>
          <p>London is the capital city of England.</p>
        </div>

        <div className="tabcontent">
          <h3>Paris</h3>
          <p>Paris is the capital of France.</p>
        </div>

      </div>
    )
  } else {
    sessionLinks = (
      <div className="login-signup">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <div>
      <div className="nav-div">
        <nav className="home">
          <NavLink exact to='/' className="nav-home">Soul<br></br>Shot</NavLink>
          {isLoaded && sessionLinks}
        </nav>
      </div>
      <h2 className="soulshot">SoulShot</h2>
      {content}
    </div>
  );
}

export default Navigation;
