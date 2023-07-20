import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toplist from "../components/Toplist";
import { auth, fs } from "../config/Config";
import LocationPage from "./Locationpage";

export const Profile = () => {
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
              // console.log(snapshot.data().Fullname);
            });
        } else {
          setuser(null);
        }
      });
    }, []);
    return user;
  }

  const user = Getcurrentuser();

  return (
    <div>
      {/* <Toplist/> */}
      <LocationPage />
    </div>
  );
};
