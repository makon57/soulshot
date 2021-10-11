import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(`/splash`);
  };

  return (
    <div className="profile-div">
      <button onClick={openMenu} className="profile-btn">
        <i className='fas fa-user-circle' />
      </button>
      {showMenu && (
        <ul className='profiledropdown'>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button className="logout-btn" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
