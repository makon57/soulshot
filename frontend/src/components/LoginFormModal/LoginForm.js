import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { loginDemo } from "../../store/session";
import './LoginForm.css';
import { useHistory } from "react-router";

function LoginForm() {
  const history = useHistory()
  const dispatch = useDispatch();
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
    const res = await dispatch(loginDemo())
    if (res) {
      return history.push(`/`)
    }
    return history.push(`/`)
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
        <p>Don't have a login?   <a href='/' onClick={demoLogin}>Demo Login</a><br></br></p>
      </div>
    </div>
  );
}

export default LoginForm;
