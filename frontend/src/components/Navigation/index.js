import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UploadFormModal from '../UploadFormModal';

import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="login-signup">
        <UploadFormModal />
        <ProfileButton user={sessionUser} />
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

  return (
    <div>
      <div className="nav-div">
        <nav className="home">
          <NavLink exact to='/' className="nav-home">Soul<br></br>Shot</NavLink>
          {isLoaded && sessionLinks}
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
