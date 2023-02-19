import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

const Login = () => {
  const userRef = useRef();
  useTitle('XYZ Tech Company - emp login')
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const [persist, setPersist] = usePersist();
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist(prev => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
     
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      switch (err?.status) {
        case 400:
          setErrMsg("No Server Response");
          break;
        case 401:
          setErrMsg("Unauthorized");
          break;
        default:
          setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };
  const errClass = errMsg ? "errMsg" : "offscreen";
  if (isLoading) return <p>Loading...</p>;

  const content = (
    <section className="public">
      <header>Employee Login</header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            name="username"
            value={username}
            onChange={handleUserInput}
            ref={userRef}
            className="form__input"
            required
          />
          <label htmlFor="username">Password : </label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            name="password"
            value={password}
            onChange={handlePwdInput}
            className="form__input"
            required
          />
          <label htmlFor="persist" className="form__persist">
            <input type="checkbox" className="form__checkbox" id="persist" onChange={handleToggle} checked={persist} />
            Remember me
          </label>
          <button className="form__submit-button">
            sign In
          </button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
