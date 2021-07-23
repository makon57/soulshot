import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { loginDemo } from "../../store/session";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async( res) => {
          const data = await res.json();
          if (data && data.errors)  setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field.']);
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(loginDemo())
  }

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <h3>Welcome to SoulShot!</h3>
      <ul className="errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button className="signup-btn" type="submit">Sign Up</button>
      <div className='demo'>
        <p>Don't have a login?   <a href='/' onClick={demoLogin}>Demo Login</a><br></br></p>
      </div>
    </form>
  );
}

export default SignupForm;
