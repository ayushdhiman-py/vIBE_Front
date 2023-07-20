import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toplist from "../components/Toplist";
import "../pages/Locationpage.css";
import { auth, fs } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-custom-alert';



const LocationPage = () => {
   
  const navigate = useNavigate();


  const [userid,setuserID] = useState();

  const [name, setName] = useState(localStorage.getItem('name') ? JSON.parse(localStorage.getItem("name")):"");
  const [mobile, setMobile] = useState(localStorage.getItem('mobile') ? JSON.parse(localStorage.getItem("mobile")):"");
  const [street, setStreet] = useState(localStorage.getItem('street') ? JSON.parse(localStorage.getItem("street")):"")
  const [landmark, setLandmark] = useState(localStorage.getItem('landmark')? JSON.parse(localStorage.getItem("landmark")):"");
  const [city, setCity] = useState(localStorage.getItem('city') ? JSON.parse(localStorage.getItem("city")):"")
  const [state, setState] = useState(localStorage.getItem('state')? JSON.parse(localStorage.getItem("state")):"");
  const [country, setCountry] = useState(localStorage.getItem('country')? JSON.parse(localStorage.getItem("country")):"India");
  const [pincode, setPincode] = useState(localStorage.getItem('pincode')? JSON.parse(localStorage.getItem("pincode")):"");
  const [errmsg, seterrmsg] = useState("");
  const [success, setsuccess] = useState("");
  
  function Getcurrentuser() {
    const [user, setuser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setuser(snapshot.data().Fullname);
              setuserID(user.uid);
            });
        } else {
          setuser(null);
        }
      });
    }, []);
    return user;
  }

  const user = Getcurrentuser();
  console.log(user,"locationpag");
  console.log(userid,"locationpage");
  
  


  // useEffect(()=>{
    // localStorage.setItem("street", JSON.stringify(street));
    //     localStorage.setItem("landmark", JSON.stringify(landmark));
    //     localStorage.setItem("city", JSON.stringify(city));
    //     localStorage.setItem("pincode", JSON.stringify(pincode));
    //     localStorage.setItem("country", JSON.stringify(country));
    //     localStorage.setItem("state", JSON.stringify(state));
    //     localStorage.setItem("name", JSON.stringify(name));
    //     localStorage.setItem("mobile", JSON.stringify(mobile));
  // }, [street, landmark, country, pincode, state, mobile, name, city])

  const alertSuccess = () => toast.success('Your address is changed ✔');
  const alertWarning = () => toast.warning('Mobile number and pincode must be valid');
  
  // const [name, setName] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [street, setStreet] = useState("")
  // const [landmark, setLandmark] = useState("");
  // const [city, setCity] = useState("")
  // const [state, setState] = useState("");
  // const [country, setCountry] = useState("");
  // const [pincode, setPincode] = useState("");
  // const [errmsg, seterrmsg] = useState("");
  // const [success, setsuccess] = useState("");
  

  const handleaddress = (e) => {
    let address = {}
    e.preventDefault();
    if(mobile.length===10 && pincode.length===6){
        localStorage.setItem("street", JSON.stringify(street));
        localStorage.setItem("landmark", JSON.stringify(landmark));
        localStorage.setItem("city", JSON.stringify(city));
        localStorage.setItem("pincode", JSON.stringify(pincode));
        localStorage.setItem("country", JSON.stringify(country));
        localStorage.setItem("state", JSON.stringify(state));
        localStorage.setItem("name", JSON.stringify(name));
        localStorage.setItem("mobile", JSON.stringify(mobile));
        localStorage.setItem("address","true");


        address["Name"] = name;
        address["Mobile"]=mobile;
        address["Street"]=street;
        address["Landmark"]=landmark;
        address["City"]=city;
        address["State"]=state;
        address["Country"]=country;
        address["Pincode"]=pincode;
        address["address"]=true;
        fs.collection("user_address")
        .doc(`${userid}`)
        .set(address)
        .then(()=>{
          console.log(address,"address pushed into firebase");
        });
        

      // auth.onAuthStateChanged(user=>{
      //   fs
      //   .collection("user_address")
      //   .doc(user.uid)
      //   .set({
      //     Name : name,
      //     Mobile : mobile,
      //     Street : street,
      //     Landmark : landmark,
      //     State : state,
      //     City : city,
      //     Country : country,
      //     Pincode : pincode,
      //     Address : true,
      //   })
      //   .then((res)=>{
      //     console.log(res,"address into firebase");
      //   })
      //   .catch(err=> console.log(err));

      // })

      setTimeout(() => {
       setsuccess("details added succesfully");
       navigate("/cart")
    }, 1000);
    alertSuccess()
      console.log(errmsg);
    } 
    else{
      alertWarning()
    }
    }
  

  return (
    <>
      <div>
        <h1
          style={{
            width: "90%",
            margin: "auto",
            backgroundColor: "blue",
            color: "white",
          }}
        >
          {success}
        </h1>
        <div className="addlocation-wrapper">
          <div className="addlocation-form-wrapper">
            {/* Form */}
            <form className="addloc-form" onSubmit={handleaddress}>
              <h2 className="address-head">Your Address</h2>
              <div className="flex-form">
                <div className="form-group">
                  <input
                    
                    type="text"
                    className="addloc-input"
                    // placeholder={!name ? "Full Name" : localStorage.getItem("name")}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="form-group">
                  <input
                    required
                    type="number"
                    className="addloc-input"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                  />
    
     
                </div>
              </div>
              <div className="form-group textarea-group">
                <textarea
                  required
                  type="text"
                  // placeholder={localStorage.getItem("street")}
                  placeholder="Street"
                  className="addloc-input extend"
                  onChange={(e) => setStreet(e.target.value)}
                  rows="4"
                  value={street}
                />
              </div>
              <div className="form-group textarea-group">
                <textarea
                  required
                  type="text"
                  className="addloc-input extend"
                  // placeholder={!landmark ? "Landmark" : localStorage.getItem("landmark")}
                  placeholder="Landmark"
                  onChange={(e) => setLandmark(e.target.value)}
                  rows="4"
                  value={landmark}
                />
              </div>
              <div className="flex-form">
                <div className="form-group">
                  <input
                    required
                    type="text"
                    className="addloc-input"
                    // placeholder={!city ? "City" : localStorage.getItem("city")}
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="text"
                    className="addloc-input"
                    // placeholder={!state ? "State" : localStorage.getItem("state")}
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  />
                </div>
              </div>
              <div className="flex-form">
                <div className="form-group">
                  <input
                    required
                    type="text"
                    className="addloc-input"
                    // placeholder={!country ? "Country" : localStorage.getItem("Country")}
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="number"
                    className="addloc-input"
                    // placeholder={!pincode ? "Pincode" : localStorage.getItem("pincode")}
                    placeholder="Pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                  />
                </div>
              </div>
              <button
                className="addloc-btn"
                type="submit"
                style={{ cursor: "pointer" }}
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPage;
