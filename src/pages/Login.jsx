import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../pages/Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, fs } from "../config/Config";
import { initializeAuthentication } from "../config/Config";
import { getAuth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Terms from "../components/Terms";
// import Privacy from "../components/Privacy";

const Login = () => {
  
  const navigate = useNavigate();
  const [fullname, setfullname] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const [success, setsuccess] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [stage2, setStage] = useState(false);
  const [stageOTP, setStage2] = useState(false);
  const [otp,setOTP] = useState();
  const [obj,setObj] = useState();
  const [genOTP,setGen] = useState(true);

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection("user_address")
        .doc(`${user.uid}`)
        .get()
        .then((snapshot)=>{
          // console.log(snapshot.data(),"address from firebase");
          if(snapshot.data()===undefined){
            localStorage.setItem("name",JSON.stringify(""));
            localStorage.setItem("mobile",JSON.stringify(""));
            localStorage.setItem("street",JSON.stringify(""));
            localStorage.setItem("state",JSON.stringify(""));
            localStorage.setItem("landmark",JSON.stringify(""));
            localStorage.setItem("city",JSON.stringify(""));
            localStorage.setItem("country",JSON.stringify(""));
            localStorage.setItem("pincode",JSON.stringify(""));
          }
          else{
            localStorage.setItem("name",JSON.stringify(snapshot.data().Name ? snapshot.data().Name: ""));
            localStorage.setItem("mobile",JSON.stringify(snapshot.data().Mobile ? snapshot.data().Mobile: ""));
            localStorage.setItem("street",JSON.stringify(snapshot.data().Street ? snapshot.data().Street: ""));
            localStorage.setItem("landmark",JSON.stringify(snapshot.data().Landmark ? snapshot.data().Landmark: ""));
            localStorage.setItem("city",JSON.stringify(snapshot.data().City ? snapshot.data().City: ""));
            localStorage.setItem("state",JSON.stringify(snapshot.data().State ? snapshot.data().State: ""));
            localStorage.setItem("country",JSON.stringify(snapshot.data().Country ? snapshot.data().Country: ""));
            localStorage.setItem("pincode",JSON.stringify(snapshot.data().Pincode ? snapshot.data().Pincode: ""));
          }
        })
      }
    })
  })
 
  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((obj) => {
        // console.log(obj.user.uid);
        setsuccess("Login successfull.");
        localStorage.setItem("uid", obj.user.uid);
        setemail("");
        setpassword("");
        seterrmsg("");
        setTimeout(() => {
          setsuccess("");
          navigate(window.history.back());
        }, 1000);
      })
      .catch((error) => seterrmsg(error.message));
  };

 
  
  

  const genCaptcha = async (e) => {
    let recaptcha = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // console.log(response,'response');
      }
    }, auth);
    // console.log(obj,"okay");
    signInWithPhoneNumber(auth,email, recaptcha)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      setObj(confirmationResult);
      // console.log(confirmationResult,"gencap");
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      // console.log(error);
    });
    setGen(false);
  }

  // const resendOTP = () => {
  //   let recaptcha = window.RecaptchaVerifier;
  //   signInWithPhoneNumber(auth,email, recaptcha)
  //   .then((confirmationResult) => {
  //     // SMS sent. Prompt user to type the code from the message, then sign the
  //     // user in with confirmationResult.confirm(code).
  //     setObj(confirmationResult);
      // console.log(confirmationResult,"gencap");
  //     // ...
  //   }).catch((error) => {
  //     // Error; SMS not sent
  //     // ...
      // console.log(error);
  //   });
  //   // setResendingOTP(true);
  //   // genCaptcha();
  // }
  
  const handleOTP = (e) =>{

    e.preventDefault();
    // console.log(obj,"handleotp");
    // console.log(email,otp,"handleotp");
    obj.confirm(otp).then((result) => {
      // User signed in successfully.
      // console.log(result,"user");
      setsuccess("Login successfull.");
      localStorage.setItem("uid", result.user.uid);
      fs.collection("users")
        .doc(result.user.uid)
        .set({
          Fullname: email,
          mobile : email,
          Password: "Signed with otp",
          login : "mobile"
        })
        .catch((error) => {
          seterrmsg(error.message);
        })
        .then((res) => {
          // console.log(res,"test");
          setsuccess("Signup successfull.");
          setfullname("");
          setemail("");
          setpassword("");
          seterrmsg("");
          setStage(false);
          setStage2(false);
          setGen(true);
          setTimeout(() => {
            setsuccess("");
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          seterrmsg(error.message);
        });

        
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      // console.log(error);
    });
    
  }

  const handleSignupGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const userGoogle = result.user;
      // console.log(userGoogle);
      localStorage.setItem("uid", userGoogle.uid);
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
    });
  };
  // console.log(user.id)
  // Dialog box start
  const continueBtn = async (e) => {
    e.preventDefault();
    setStage(true);
    if (email.includes("@")) {
      // console.log("Sign in with email");
    } else {
      setStage2(true);
      // console.log("Sign in with mobile number");
    }
  };


  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Dialog box end
  return (
    <>
      <div className="login-wrapper">
        {stage2 === false ? (
          <div className="login">
            <div className="login-content">
              <span className="login-title">
                {/* Add logo here */}
                Welcome back!
              </span>
              {/* <span className="login-instructions">
              Welcome back, please Login to your account
            </span> */}

              {/* <div className="login-or">- OR -</div> */}
              <form className="login-form" onSubmit={handleSignup}>
                <label className="signup-label">
                  <span>Email Address / Mobile Number</span>
                  <input
                    type="text"
                    name="mail"
                    className="login-miniform"
                    
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </label>
                {/* <label className="signup-label">
                <span>Password</span>
                <input
                  type="password"
                  name="Password"
                  className="login-miniform"
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </label> */}
                {/* <div className="login-aditional">
                <div className="login-checkbox-container">
                  <input type="checkbox" id="remember" />
                  <label for="remember">Remember me</label>
                </div>
                <a className="login-forgot-password">Forgot Password</a>
              </div> */}
                {success && (
                  <>
                    <div className="success-msg">
                      <center
                        style={{
                          // backgroundColor: "#7DCE13",
                          margin: "auto",
                          padding: "5px",
                          borderRadius: "10px",
                          color: "#7DCE13",
                          fontWeight: "600",
                        }}
                      >
                        {success}
                      </center>
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
                        fontWeight: "600s",
                      }}
                      className="success-msg"
                    >
                      <center>Please enter details carefully</center>
                    </div>
                  </>
                )}
                <div id='recaptcha-container'></div>
                <center>
                  <div className="login-btn">
                    <center>
                      <button className="login-btn-login" onClick={continueBtn}>
                        Continue
                      </button>
                    </center>
                    {/* <center>
                    <button type="submit" className="login-btn-login">
                      Login
                    </button>
                  </center> */}

                    <div className="login-button" onClick={handleSignupGoogle}>
                      <button
                        className="login-google"
                        style={{
                          padding: "20px 0px",
                        }}
                      >
                        {/* googel icon */}
                        <FcGoogle
                          style={{
                            fontSize: "20px",
                            paddingRight: "5px",
                          }}
                        />
                        Continue with Google
                      </button>
                    </div>
                  </div>
                </center>

                <div className="signup-section" style={{ display: "flex" }}>
                  Don't have an account?
                  <Link to={"/signup"} className="login-signup">
                    Sign up
                  </Link>
                </div>
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
                      and Privacy Policy
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="login">
            {stageOTP ? (
              <div className="login-content">
                <span className="login-title">Sign In with OTP</span>
                <div id="recaptcha-container"></div>
                <form className="login-form" onSubmit={handleOTP}>
                <label className="signup-label">
                <span>Send OTP to {email} ?</span>
                <input
                  type="number"
                  name="otp"
                  className="login-miniform"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </label>
                  {genOTP ? (

                    <center>
                      <button className="login-btn-login"  onClick={genCaptcha}>
                        Generate OTP
                      </button>
                    </center>
                  ):(
                    <>
                    <center>
                      <button className="login-btn-login"  onClick={handleOTP}>
                        Verify
                      </button>
                    </center>
                    
                    </>
                  )}
                  
                </form>
              </div>
            ) : (
              <div className="login-content">
                <span className="login-title">Sign In with Email</span>
                <form className="login-form" onSubmit={handleSignup}>
                
                <label className="signup-label">
                <span>Password</span>
                <input
                  type="password"
                  name="Password"
                  className="login-miniform"
                  
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </label>
                {/* <div className="login-aditional">
                <div className="login-checkbox-container">
                  <input type="checkbox" id="remember" />
                  <label for="remember">Remember me</label>
                </div>
                <a className="login-forgot-password">Forgot Password</a>
              </div> */}
                {success && (
                  <>
                    <div className="success-msg">
                      <center
                        style={{
                          // backgroundColor: "#7DCE13",
                          margin: "auto",
                          padding: "5px",
                          borderRadius: "10px",
                          color: "#7DCE13",
                          fontWeight: "600",
                        }}
                      >
                        {success}
                      </center>
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
                        fontWeight: "600s",
                      }}
                      className="success-msg"
                    >
                      <center>Please enter details carefully</center>
                    </div>
                  </>
                )}
                <center>
                  <div className="login-btn">
                    <center>
                      <button className="login-btn-login" onClick={handleSignup}>
                        Continue
                      </button>
                    </center>
                  </div>
                  <div className="login-button" onClick={handleSignupGoogle}>
                      <button
                        className="login-google"
                        style={{
                          padding: "20px 0px",
                        }}
                      >
                        {/* googel icon */}
                        <FcGoogle
                          style={{
                            fontSize: "20px",
                            paddingRight: "5px",
                          }}
                        />
                        Continue with Google
                      </button>
                    </div>
                </center>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;