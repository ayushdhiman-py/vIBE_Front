import { DeskTopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import { Link } from "react-router-dom";
import { auth } from "../../config/Config";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { BsEmojiNeutralFill } from "react-icons/bs";
import "./Navbar.css";

export const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handlelogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <div className="navbar-wrapper">
        <div className="nav-left-items-container">
          <div className="nav-left-item nav-left-item-logo">
            <Link to="/">
              <img
                src={logo}
                alt="vIBE"
                width="100px"
                height="100px"
                marginLeft="10px"
                scale="1"
              />
            </Link>
          </div>
          {/* {user ? (
            <div
              className="nav-left-item nav-left-user-item"
              style={{ fontSize: "40px", fontWeight: "bold" }}
            >
              Hi, {user}
            </div>
          ) : (
            ""
          )} */}
        </div>

        <div className="nav-right-items-container">
          {user && <DeskTopNavbar user={user}/>}
          <div className="nav-right-items-btn-container">
            {user && (
              <>
                <button
                  className="nav-right-item btn-outline"
                  style={{
                    padding: "5px 10px",
                    border: "1px solid black",
                    borderRadius: "2px 10px",
                    margin: "0px 25px",
                    fontSize:"20px"
                  }}
                  onClick={handlelogout}
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login">
                  <button
                    className="nav-right-item btn-outline"
                    style={{
                      padding: "5px 10px",
                      border: "1px solid black",
                      borderRadius: "2px 10px",
                      margin: "0px 25px",
                      fontSize:"20px"
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="nav-right-item btn-outline"
                    style={{
                      padding: "5px 10px",
                      border: "1px solid black",
                      borderRadius: "2px 10px",
                      margin: "0px 25px",
                      fontSize:"20px"
                    }}
                  >
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {user && <MobileNavbar />}
    </>
  );
};
