import React from "react";
import LOGO from "../images/logo.png";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { auth } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { CgLogIn } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handlelogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };
  return (
    <div className="navbar">
      <div className="logo-location-input">
        <div className="logo-location">
          <Link to="/">
            <img
              className="logo"
              src={LOGO}
              alt="vIBE."
              height={"50px"}
              style={{ marginLeft: "20px", scale: "1" }}
            />
          </Link>
          <div className="location-selection">
            {/* <select className="selectlocation">
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Gurugram">Gurugram</option>
            </select> */}
          </div>
        </div>
        {user ? (
          <h1 className="nuser-text">Hi , {user}</h1>
        ) : (
          BsEmojiNeutralFill
        )}
        {/* <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search your favourites..."
            className="input"
          />
          <SearchIcon className="searchicon" />
        </div> */}
      </div>
      <div className="menu-wrapper">
        <ul>
          {user && (
            <div style={{ marginRight: "30px", display: "flex" }}>
              <Link className="navbar-link link" to={"/whishlist"}>
                <li
                  className="nav-links"
                  style={{
                    padding: "2px 10px",
                    fontSize: "30px",
                    marginRight: "10px",
                  }}
                >
                  <AiOutlineHeart />
                </li>
              </Link>
              <Link className="navbar-link link" to={"/cart"}>
                <li
                  className="nav-links"
                  style={{
                    padding: "2px 10px",
                    fontSize: "25px",
                    marginRight: "10px",
                  }}
                >
                  <BsHandbag />
                </li>
              </Link>
              <Link className="navbar-link link" to={"/profile"}>
                <li
                  className="nav-links"
                  style={{
                    padding: "2px 10px",
                    fontSize: "25px",
                    marginRight: "10px",
                  }}
                >
                  <CgProfile />
                </li>
              </Link>
              <Link className="navbar-link link" to={"/trackOrder"}>
                <li
                  className="nav-links"
                  style={{ padding: "2px 10px", marginRight: "20px", fontSize:"40px" }}
                >
                  Orders
                </li>
              </Link>
              <Link
                className="navbar-link link"
                to={"/"}
                onClick={handlelogout}
              >
                <li
                  className="nav-links nav-box"
                  style={{
                    padding: "2px 10px",
                    border: "1px solid black",
                    borderRadius: "2px 10px",
                    marginRight: "10px",
                  }}
                >
                  Logout
                </li>
              </Link>
            </div>
          )}
          {!user && (
            <>
              <Link className="navbar-link link" to={"/login"}>
                <li
                  className="nav-links nav-box"
                  style={{
                    padding: "2px 10px",
                    border: "1px solid black",
                    borderRadius: "2px 10px",
                    marginRight: "25px",
                  }}
                >
                  {/* <CgLogIn/>  */}
                  Login
                </li>
              </Link>
              <Link className="navbar-link link" to={"/signup"}>
                <li
                  className="nav-links nav-box"
                  style={{
                    padding: "2px 10px",
                    border: "1px solid black",
                    borderRadius: "2px 10px",
                    marginRight: "30px",
                  }}
                >
                  Sign up
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
