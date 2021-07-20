import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
// import ImageInput from '../ImageInput';

import './Navigation.css';
// import images from '../../data/images.json';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  // const routeChange = () => {
  //   let path =
  // }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
        <button onClick={()=> history.push("/images")}>Upload</button>
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
          <NavLink exact to='/' className="nav-home">Home</NavLink>
          {isLoaded && sessionLinks}
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
