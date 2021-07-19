import React from 'react';
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import images from '../../data/images.json';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
          <NavLink exact to='/' className="nav-home">Home</NavLink>
          {isLoaded && sessionLinks}
        </nav>
      </div>
      <div>
        <h2>SoulShot</h2>
      </div>
      <div className="container">
        <ul className="image-list">
        {images.map((image) => (
          <li key={image.imageUrl} className="item">
            <img src={image.imageUrl} alt=''></img>
          </li>
        ))}
        </ul>
      </div>
    </div>

  );
}

export default Navigation;
