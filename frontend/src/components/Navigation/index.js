import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
// import images from '../../data/images.json';

import { fetchImages } from '../../store/home';

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

  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

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
        {images?.map((image) => (
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
