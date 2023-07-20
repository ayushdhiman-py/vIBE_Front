import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../pages/Signup.css";
import { auth, fs } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { initializeAuthentication } from "../config/Config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Terms from "../components/Terms";
import Privacy from "./Privacy";

const Signup = () => {
  const navigate = useNavigate();
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const [success, setsuccess] = useState("");

  const [userGoogle, setUserGoogle] = useState("");

  const handleSignupGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const userGoogle = result.user;
      // console.log(userGoogle);
      fs.collection("users")
        .doc(userGoogle.uid)
        .set({
          Fullname: userGoogle.displayName,
          Email: userGoogle.email,
          Password: "Signed with google",
        })
        .catch((error) => {
          seterrmsg(error.message);
        })
        .then(() => {
          setsuccess("Signup successfull");
          setfullname("");
          setemail("");
          setpassword("");
          seterrmsg("");
          setTimeout(() => {
            setsuccess("");
            navigate(window.history.length >= 2 ? -2 : window.history.back());
          }, 1000);
        })
        .catch((error) => {
          seterrmsg(error.message);
        });
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        // console.log(credentials);
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            Fullname: fullname,
            Email: email,
            Password: password,
          })
          .then(() => {
            setsuccess("Signup successfull.");
            setfullname("");
            setemail("");
            setpassword("");
            seterrmsg("");
            setTimeout(() => {
              setsuccess("");
              navigate(window.history.back());
            }, 1000);
          })
          .catch((error) => {
            seterrmsg(error.message);
          });
      })
      .catch((error) => {
        seterrmsg(error.message);
      });
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login">
          <div className="login-content">
            <span className="login-title">
              {/* Add logo here */}
              Create an account
            </span>
            {/* <span className="login-instructions">Please Signup</span> */}

            {/* <div className="login-or">- OR -</div> */}
            {/* --------------form starts------------------- */}
            <form className="login-form" onSubmit={handleSignup}>
              <label className="signup-label">
                <span>Full name</span>
                <input
                  type="text"
                  name="fullname"
                  className="login-miniform"
                  required
                  onChange={(e) => setfullname(e.target.value)}
                  value={fullname}
                />
              </label>
              <label className="signup-label">
                <span>Email Address</span>
                <input
                  type="email"
                  name="mail"
                  className="login-miniform"
                  required
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
              </label>
              <label className="signup-label">
                <span>Password</span>
                <input
                  type="password"
                  name="Password"
                  className="login-miniform"
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </label>
              {/* <label className="signup-label">
                <span>Re-enter password</span>
                <input
                  type="password"
                  name="Password"
                  className="login-miniform"
                  required
                  onChange={(e) => setrepassword(e.target.value)}
                  value={repassword}
                />
              </label> */}
              {success && (
                <>
                  <div
                    style={{
                      // backgroundColor: "#7DCE13",
                      margin: "auto",
                      padding: "5px",
                      borderRadius: "10px",
                      color: "#7DCE13",
                      fontWeight: "600",
                    }}
                    className="success-msg"
                  >
                    {success}
                  </div>
                </>
              )}
              {errmsg && (
                <>
                  <div
                    style={{
                      // backgroundColor: "red",
                      margin: "auto",
                      padding: "5px",
                      borderRadius: "10px",
                      color: "red",
                      fontWeight: "600",
                    }}
                    className="success-msg"
                  >
                    <center>Please enter details carefully</center>
                  </div>
                </>
              )}
              <div className="login-btn" style={{ width: "101%" }}>
                <center>
                  <button className="login-btn-login" onClick={handleSignup}>
                    Sign up
                  </button>
                  <div className="login-btn" onClick={handleSignupGoogle}>
                    <center>
                      <button className="login-google">
                        <FcGoogle
                          style={{
                            // fontSize: "20px",
                            fontSize: "20px",
                            paddingRight: "5px",
                          }}
                        />
                        Continue with Google
                      </button>
                    </center>
                  </div>
                </center>
              </div>
              <div
                className="signup-section"
                style={{ display: "flex", marginTop: "20px" }}
              >
                Already have an account?
                <Link to={"/login"} className="login-signup">
                  Login
                </Link>
              </div>
              {/* <Link
                to={"/login"}
                className="login-btn-login"
                style={{
                  padding: "6px",
                  borderRadius: "3px",
                  textAlign: "center",
                  marginTop: "10px",
                  width: "97.5%",
                }}
              >
                Log in
              </Link> */}
              <div className="login-tyc-wrapper">
                <span
                  className="login-tyc-wrapper-span"
                  style={{ marginRight: "5px" }}
                >
                  By signing up you agree to vIBE's
                </span>
                <Terms />
                <Link to={"/privacy"} style={{ textDecoration: "none" }}>
                  <span
                    className="privacy"
                    style={{ marginLeft: "5px", color: "#2c8f88" }}
                  >
                    and privacy
                  </span>
                </Link>
              </div>
            </form>

            {/* {errmsg && (
              <>
                <div className="error-msg">
                  <br />
                  <br />
                  {errmsg}
                </div>
              </>
            )} */}
            {/* --------------form ends------------------- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
