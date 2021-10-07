import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { loginDemo } from "../../store/session";
import { Link } from "react-router-dom";
import './LoginForm.css';
import { Route, useHistory } from "react-router";
import ImageList from "../ImageList";


function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(loginDemo())
    return history.push(`/`);
  }

  return (
    <div>
      <h3>Welcome Back!</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
        <button className="login-btn" type="submit">Log In</button>
      </form>
      <div className='demo'>
        <p>Don't have a login?   <Link exact to='/' onClick={demoLogin}>Demo Login</Link><Route path='/' component={ImageList} exact /><br></br></p>
      </div>
    </div>
  );
}

export default LoginForm;
