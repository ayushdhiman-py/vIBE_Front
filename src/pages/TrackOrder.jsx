import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toplist from "../components/Toplist";
import { auth, fs } from "../config/Config";
import "../pages/TrackOrder.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { TbTruckDelivery } from "react-icons/tb";

const TrackOrder = () => {
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
              console.log(snapshot.data().Fullname);
            });
        } else {
          setuser(null);
        }
      });
    }, []);
    return user;
  }

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.vIBE.com/items/inventory")
      .then((response) => {
        return response.json();
      })
      .then((actualdata) => {
        setData(actualdata.data);
        console.log(actualdata.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const user = Getcurrentuser();

  ////display product//////
  const [trackorderProduct, settrackorderProduct] = useState(null);
  useEffect(() => {
    fetch("https://api.vIBE.com/items/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualtrackorderProduct) => {
        settrackorderProduct(actualtrackorderProduct.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(trackorderProduct);
  ////display product end//////

  const [trackingProd, settrackingProd] = useState([]);
  const [uidInventory, setuidInventory] = useState([]);
  useEffect(() => {
    const getTrackData = () => {
      data &&
        data.map((d) => {
          let proAPI = `https://api.vIBE.com/items/products/${
            d.id.split(".")[2]
          }`;
          setuidInventory(d.id.split(".")[0]);
          console.log("link", proAPI);
          fetch(proAPI)
            .then((data) => {
              return data.json();
            })
            .then((data) => {
              console.log(data.data);
              settrackingProd((trackingProd) => [...trackingProd, data.data]);
              console.log(trackingProd);
            });
        });
    };
    getTrackData();
  }, [user]);
  console.log(uidInventory, localStorage.getItem("uid"));

  return (
    <div>
      {/* <Navbar user={user} /> */}
      {/* <Toplist /> */}
      <center>
        <div className="track-container">
          <div className="track-header">Your Orders</div>
          <center>
            {/* <hr style={{ marginBottom: "-10px" }} /> */}
            <div className="track-grid">
              {data &&
                data.map((data) => {
                  console.log(data);
                  return data.customer_id === localStorage.getItem("uid") ? (
                    <>
                      <div className="titem-card">
                        <hr />
                        <div className="titem-status">
                          <p className="detail-text">
                            {
                              <div className="track-status">
                                <TbTruckDelivery
                                  className="detail-icon"
                                  style={{
                                    margin: "0px 10px 0px 20px",
                                    fontSize: "30px",
                                  }}
                                />
                                {!data.dispatch_status &&
                                !data.in_progress_status &&
                                !data.order_completed_status &&
                                !data.return_status ? (
                                  <span>Order Placed</span>
                                ) : null}
                                {
                                  <div className="track-status">
                                    {data.dispatch_status ? "Dispatched" : null}
                                  </div>
                                }
                                {
                                  <div className="track-status">
                                    {data.in_progress_status
                                      ? "In progress"
                                      : null}
                                  </div>
                                }
                                {
                                  <div className="track-status">
                                    {data.order_completed_status
                                      ? "Completed"
                                      : null}
                                  </div>
                                }
                                {
                                  <div
                                    className="track-status"
                                    style={{ width: "20%" }}
                                  >
                                    {data.return_status ? "Return" : null}
                                  </div>
                                }
                                {
                                  <div
                                    className="track-status"
                                    style={{ width: "20%" }}
                                  >
                                    {data.cancel_status ? "Cancelled" : null}
                                  </div>
                                }
                              </div>
                            }
                          </p>
                        </div>
                        <div className="titem-detail">
                          <div className="track-img-sec">
                            <Link
                              to={`/productpage/${data.category}/${
                                data.id[data.id.length - 1]
                              }`}
                            >
                              <div
                                className="titem-img"
                                style={{
                                  backgroundImage:
                                    "url(" +
                                    "https://api.vIBE.com/assets/" +
                                    `${data.image_of_design}` +
                                    ")",
                                }}
                              ></div>
                            </Link>
                          </div>

                          <div className="titem-detail-wrap">
                            <div
                              className="titem-header"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div className="titem-name"></div>
                              {!data.dispatch_status &&
                              !data.in_progress_status &&
                              !data.order_completed_status &&
                              !data.return_status ? (
                                <a href="mailto:contact@vIBE.com?body=I want to cancel the product with name ________.">
                                  <button className="cancel-btn">Cancel</button>
                                </a>
                              ) : null}

                              {/* contact@vIBE.com */}
                            </div>
                            <div className="titem-card-detail">
                              <div className="box titem-price">
                                Price : ₹ {data.price}
                              </div>
                              <div className="box titem-quan">
                                Quantity : {data.quantity}
                              </div>

                              <div className="box titem-color">
                                Color : {data.color}
                              </div>
                              <div className="box titem-size">
                                Size : {data.size}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className="track-img"
                        style={{
                          backgroundImage:
                            "url(" +
                            "https://api.vIBE.com/assets/" +
                            `${data.images[0]}` +
                            ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div> */}
                      {/* Order id : {data.id} */}
                      {/* Order image : {data.banner} */}
                      {/* Order price : {data.price} */}
                      {/* <div className="track-price" style={{ width: "20%" }}>
                        Price : {data.price}
                      </div>
                      <div className="track-price" style={{ width: "20%" }}>
                        Quantity : {data.quantity}
                      </div>
                      <div className="track-price" style={{ width: "20%" }}>
                        Color : {data.color}
                      </div>
                      <div className="track-price" style={{ width: "20%" }}>
                        Size : {data.size}
                      </div>
                      {console.log(
                        data.customer_id,
                        "===",
                        localStorage.getItem("uid"),
                        "image :"
                        // data.images[0]
                      )} */}
                      {/* <div
                        className="track-img"
                        style={{
                          backgroundImage:
                            "url(" +
                            "https://api.vIBE.com/assets/" +
                            `${data.images[0]}` +
                            ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div> */}
                      {/* Order id : {data.id} */}
                      {/* Order image : {data.banner} */}
                      {/* Order price : {data.price} */}

                      {/*                       
                      <div className="track-detail-wrap">
                        <div className="track-detail">
                          <p className="detail-text">
                            {
                              <div
                                className="track-price"
                                style={{ width: "20%" }}
                              >
                                <BsCircleFill
                                  className="detail-circle"
                                  color="#09E778"
                                />

                                {data.cancel_status ? "Cancelled" : "circle"}
                              </div>
                            }
                            {
                              <div
                                className="track-price"
                                style={{ width: "20%" }}
                              >
                                {data.dispatch_status ? "Dispatched" : null}
                              </div>
                            }
                            {
                              <div
                                className="track-price"
                                style={{ width: "20%" }}
                              >
                                {data.in_progress_status ? "In progress" : null}
                              </div>
                            }
                            {
                              <div
                                className="track-price"
                                style={{ width: "20%" }}
                              >
                                {data.order_completed_status
                                  ? "Completed"
                                  : null}
                              </div>
                            }
                            {
                              <div
                                className="track-price"
                                style={{ width: "20%" }}
                              >
                                {data.return_status ? "Return" : null}
                              </div>
                            }
                          </p>
                        </div> */}
                      {/* <button
                          className="detail-cn-button"
                          style={{ marginTop: "-15px", width: "150px" }}
                        >Cancel</button> */}
                      {/* </div> */}

                      {console.log(
                        data.customer_id,
                        "===",
                        localStorage.getItem("uid"),
                        "image :"
                        // data.images[0]
                      )}
                    </>
                  ) : null;
                })}
              {/* <div
                    className="track-name"
                    style={{ marginLeft: "10px", width: "40%" }}
                  >
                  IITian Half Tshirt
                  </div>
                  <div className="track-price" style={{ width: "20%" }}>
                    ₹ 800
                  </div>
                  <div className="track-detail-wrap">
                    <div className="track-detail">
                      <BsCircleFill className="detail-circle" color="#09E778" />
                      <p className="detail-text"> Order Delivered</p>
                    </div>
                    <button
                      className="detail-cn-button"
                      style={{ marginTop: "-15px", width: "150px" }}
                    >
                      Cancel
                    </button>
                  </div> */}
            </div>
          </center>
        </div>
      </center>
      {/* <div className="track-order-main-section">
        <div className="track-search-wrapper">
          <center>
            <div className="track-search-container">
              <div
                className="track-search-icon"
                style={{
                  backgroundColor: "White",
                  padding: "2px 10px",
                  marginleft: "20px",
                  color: "grey",
                  marginTop: "2px",
                }}
              >
                <SearchIcon />
              </div>
              <div className="track-search-input-sec">
                <input
                  type="text"
                  className="track-search-input"
                  placeholder="Search your orders here"
                />
              </div>
              <div className="track-search-btn-sec">
                <button className="track-search-btn">Search Orders</button>
              </div>
            </div>
          </center>
        </div>
        <div className="track-order-item-wrapper">
          <div className="order-item-card">
            {trackingProd.map((data) => {
              console.log(data)
              return (
                <>
                  <h1>banner: {data.banner}</h1>
                  <h1>price: {data.price}</h1>
                  <h1>name: {data.name}</h1>
                </>
              );
            })}
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default TrackOrder;
