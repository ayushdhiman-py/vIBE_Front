import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import BannerImg from "../images/Banner.png"
//------skeleton------
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./../components/skeleton/homeSkeleton";
//------end here
import "aos/dist/aos.css";
import Aos from "aos";
import "./Homepage.css";
import QualitySection from "../components/QualitySection";
import Toplist from "../components/Toplist";
import Footer from "../components/Footer";
import { auth, fs } from "../config/Config";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Banner } from "./Banner";
import ParticularProduct from "./ParticularProduct";

const Homepage = (props) => {
  const navigate = useNavigate;
  const [loading, setLoading] = useState(true);
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
            });
        } else {
          setuser(null);
        }
      });
    }, []);
    return user;
  }
  fetch("http://localhost:5000/api/products")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      data.myData.forEach((item) => {
        // console.log(item.name, item.price, item.company);
      });
    })
    .then(() => {
      // console.log("Request successful");
    })
    .catch((error) => console.error(error));

  const [homepageTopseller, sethomepageTopseller] = useState(null);
  useEffect(() => {
    // setLoading(true);
    setTimeout(() => {
      // fetch("https://api.vIBE.com/items/products", { mode: "no-cors" })
      fetch("http://localhost:5000/api/products")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          // console.log("response inside");
          return response.json();
        })
        .then((d) => {
          sethomepageTopseller(d.myData);
          setLoading(false);
          // console.log(d.myData);
        })
        .catch((err) => {
          // console.log("response");
          // console.log(err.message);
        });
    }, 1000);
  }, []);

  const user = Getcurrentuser();

  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);

  return (
    <>
      <div className="homepage-wrapper">
        <Banner />
        <QualitySection />
        <div className="collection-wrapper">
          <div
            className="collection-heading"
            style={{ marginTop: "2px", marginBottom: "5px" }}
          >
            <center>COLLECTIONS</center>
          </div>
          <SkeletonTheme baseColor="#cfcfcf" highlightColor="#DFD8D7">
            {loading ? (
              <>
                <div className="skeleton">
                  <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
                </div>
              </>
            ) : (
              <div
                className="collection-item-wrapper"
                style={{
                  height: "600px",
                  marginBottom: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  {homepageTopseller &&
                    homepageTopseller.map((homepageTopseller) => (
                      <>
                        <div
                          key={homepageTopseller.id}
                          style={{
                            height: "400px",
                            width: "400px",
                            margin: "auto",
                          }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`products/${homepageTopseller.id}`}
                            onClick={() => {
                              <ParticularProduct
                                cat_id={homepageTopseller.id}
                              />;
                            }}
                          >
                            <div
                              style={{
                                borderRadius: "10px",
                                backgroundImage: `url(${homepageTopseller.image})`,
                                backgroundSize: "cover",
                                height: "400px",
                              }}
                            ></div>
                            <div
                              style={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                              {homepageTopseller.company}
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            )}
          </SkeletonTheme>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
