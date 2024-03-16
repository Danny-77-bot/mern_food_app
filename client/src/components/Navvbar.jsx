import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="navbar">
        <img src={`/logo.png`} alt="logo" />
      {cookies.access_token && <Link to="/">Home</Link>}
      {cookies.access_token && <Link to="/create-post">Create Post</Link>}
      {cookies.access_token && <Link to="/saved-posts">Saved Posts</Link>}
      {!cookies.access_token && <Link to="/login">Login</Link>}
      {!cookies.access_token && <Link to="/register">Register</Link>}
      {cookies.access_token && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default Navbar;
