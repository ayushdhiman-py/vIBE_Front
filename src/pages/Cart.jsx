import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Razorpay from "../components/Razorpay";
import Toplist from "../components/Toplist";
import { auth, fs } from "../config/Config";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import "./Cart.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import RefreshIcon from "@mui/icons-material/Refresh";
import ProductCard from "../components/ProductCard";
import { textAlign } from "@mui/system";
import { senddata } from "../components/send";
import { BsTrash } from "react-icons/bs";
import Footer from "../components/Footer";

const Cart = ({ userid }) => {
  let deliverycharges = 0;
  const navigate = useNavigate();

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

  const user = Getcurrentuser();
  const [cartProducts, setCartProducts] = useState([]);
  
  const cart = fs.collection("cart");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        cart.onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProducts(newCartProduct);
        });
      } else {
        setTimeout(() => {
          navigate("/login");
        }, 100);
      }
    });
  }, [user]);

  let particularProductArray = [];
  const handleProductDecrease = (p, userid, name, quantity, price, id) => {
    particularProductArray.map((ele) => {
      if (ele[0] === name && ele[1] === userid && quantity > 1) {
        ProdUpdate = p;
        ProdUpdate.quantity = ProdUpdate.quantity - 1;
        x -= price * quantity;
        auth.onAuthStateChanged((user) => {
          if (user) {
            fs.collection("cart")
              .doc("USER_ID = " + userid + ` PRODUCT_ID = ${id}`)
              .update(ProdUpdate)
              .then(() => {
                // console.log("done decrement");
              });
          } else {
            // console.log("can't decrement ");
          }
        });
      }
    });
  };

  let ProdUpdate;
  const handleProductIncrease = (p, userid, name, quantity, price, id) => {
    particularProductArray.map((ele) => {
      if (ele[0] === name && ele[1] === userid) {
        ProdUpdate = p;
        ProdUpdate.quantity = ProdUpdate.quantity + 1;
        x += price * quantity;
        auth.onAuthStateChanged((user) => {
          if (user) {
            fs.collection("cart")
              .doc("USER_ID = " + userid + ` PRODUCT_ID = ${id}`)
              .update(ProdUpdate)
              .then(() => {
                // console.log("done increment");
              });
          } else {
            // console.log("cant increment ");
          }
        });
      }
    });
  };
  const handleProductDelete = (p, userid, name, quantity, price, id) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("cart")
          .doc(`USER_ID = ` + userid + ` PRODUCT_ID = ${id}`)
          .delete()
          .then(() => {
            delete products[`${id}`];
            cartProducts = cartProducts.filter((item) => {
              return item.ID !== `USER_ID = ` + userid + ` PRODUCT_ID = ${id}`;
            });
            // console.log("deleted item");
          });
      } else {
      }
    });
  };


  let x = 0;
  let totalq = 0;

  function total() {
    cartProducts.map((p) => {
      const slicedid = p.ID.slice(10, 38);
      if (slicedid === userid) {
        x += p.price * p.quantity;
      }
      // x += 40;
    });
    return x;
  }
  totalq = total();
  // console.log(cartProducts.length);

  const [useradd, setuseradd] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      if (user) {
        fs.collection("user_address")
        .doc(`${user.uid}`)
        .get()
        .then((snapshot)=>{
          snapshot.data() ? setuseradd(true) : setuseradd(false);
        })
      } else {
        setuseradd(false);
      }
    });
  }, [user]);
  // console.log(useradd,'working');

  const [products, setProducts] = useState({});
  // console.log(products);
  // console.log(useradd);
  return (
    <div>
      {/* <Toplist /> */}
      <center>
        <div className="cart-container">
          <div
            className="cart-header"
            style={{
              textAlign: "left",
              marginBottom: "30px",
            }}
          >
            Your Cart Item
          </div>
          <div className="cart-item-container">
            <div className="cart-item-grid">
              {cartProducts.length <= 0 && (
                <div className="noproduct">Add your favourites here</div>
              )}
              {cartProducts.length > 0 && (
                <div className="noproduct">
                  
                  {cartProducts.map((p) => {
                    const slicedid = p.ID.slice(10, 38);
                    if (slicedid === userid) {
                      let tosend = {};
                      tosend["userid_id"] = localStorage.getItem("uid");
                      tosend["product_id"] = p.id;
                      tosend["quantity"] = p.quantity;
                      tosend["categoryId"] = p.categoryId;
                      tosend["productPrice"] = p.price;
                      tosend["banner"] = p.banner;
                      tosend["size"] = p.size[0];
                      particularProductArray.push([p.name, userid]);
                      // console.log(tosend);
                      products[`${p.id}`] = tosend;

                      return (
                        <div className="main-card-wrap">
                          <hr />
                          <div className="cart-card" key={p.id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                marginRight: "6px",
                              }}
                            >
                              <Link to={`/productpage/${p.categoryId}/${p.id}`}>
                                <div className="wish-img">
                                  <img
                                    src={`${p.image}`}
                                    alt=""
                                    className="wish-img"
                                  />
                                </div>
                              </Link>
                              <hr style={{ marginLeft: "5px" }} />
                              <div className="wish-details">
                                <div className="wish-text wish-item-text">
                                  <b>{p.name}</b>
                                </div>
                                <div
                                  className="p-details"
                                  style={{ display: "flex" , flexDirection:"column",alignItems:"flex-start",
                                  margin:"10px", fontWeight:"600"}}
                                >
                                  <div
                                    className="wish-text m5"
                                    
                                  >
                                    Size : {p.size}
                                  </div>
                                  <div
                                    className="wish-text m5"
                                    
                                  >
                                    Price : ₹ {p.price}
                                  </div>
                                </div>

                                {/* Product size : {p.sizes[0]} */}
                                {/* <h4>Price : {p.price}</h4> */}
                              </div>
                            </div>
                            <div className="holder">
                              <div className="incDec">
                                <div
                                  onClick={() =>
                                    handleProductDecrease(
                                      p,
                                      userid,
                                      p.name,
                                      p.quantity,
                                      p.price,
                                      p.id
                                    )
                                  }
                                >
                                  <Icon icon={minus} size={20} />
                                </div>
                                <div
                                  className="cart-quantity"
                                  style={{ padding: "5px 10px" }}
                                >
                                  {p.quantity}
                                </div>
                                <div
                                  onClick={() =>
                                    handleProductIncrease(
                                      p,
                                      userid,
                                      p.name,
                                      p.quantity,
                                      p.price,
                                      p.id
                                    )
                                  }
                                >
                                  <Icon icon={plus} size={20} />
                                </div>
                              </div>

                              <div className="delete-btn">
                                <BsTrash
                                  onClick={() =>
                                    handleProductDelete(
                                      p,
                                      userid,
                                      p.name,
                                      p.quantity,
                                      p.price,
                                      p.id
                                    )
                                  }
                                />
                              </div>
                            </div> 
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="cart-detail-container">
            <div
              className="cart-address-wrapper"
              style={{
                boxShadow: "none",
                padding: "10px",
              }}
            >
              <Accordion
                defaultExpanded={false}
                className="product-accordion-main"
              >
                <AccordionSummary
                  id="panel1-header"
                  className="product-accordion-header"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <div className="accordion-heading">
                    <div className="cart-add-header">
                      <div className="cart-add-icon">
                        <LocationOnRoundedIcon />
                      </div>
                      <div
                        className="cart-add-heading"
                        style={{
                          margin: "5px",
                        }}
                      >
                        <div className="add-heading-bold">Delivery Address</div>
                        <div
                          className="add-heading-light"
                          style={{
                            fontWeight: "lighter",
                            marginTop: "5px",
                          }}
                        >
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="product-accordion-detail">
                  <div className="addInfo"> We will deliver your order to this address</div>
                  {useradd ? (
                    <div className="cart-address-detail-header">
                      <ul className="cart-details-list">
                        <li className="add-detail-fullname m7">
                          {/* {useradd.Name} */}
                          {localStorage.getItem('name') ? JSON.parse(localStorage.getItem("name")):null}
                        </li>
                        {/* <li className="add-detail-addtype">Home</li> */}
                        {/* {useradd.Street ? ( */}
                          <label className="delivery-label">Street: </label>
                        {/* ) : null} */}
                        <li className="add-detail-addline1 m7">
                          {/* {useradd.Street} */}
                          {localStorage.getItem('street') ? JSON.parse(localStorage.getItem("street")):null}
                        </li>
                        {/* {useradd.Landmark ? ( */}
                          <label className="delivery-label">Landmark: </label>
                        {/* ) : null} */}
                        <li className="add-detail-landmark m7">
                        {localStorage.getItem('landmark')? JSON.parse(localStorage.getItem("landmark")):null}
                          {/* {useradd.Landmark} */}
                        </li>
                        {/* {useradd.City ? ( */}
                          <label className="delivery-label">City: </label>
                        {/* ) : null} */}
                        <li className="add-detail-addline2 m7">
                        {localStorage.getItem('city') ? JSON.parse(localStorage.getItem("city")):null}
                          {/* {useradd.City} */}
                        </li>
                        {/* {useradd.State ? ( */}
                          <label className="delivery-label">State: </label>
                        {/* ) : null} */}
                        <li className="add-detail-state-country m7">
                          {/* {useradd.State} */}
                          {localStorage.getItem('state')? JSON.parse(localStorage.getItem("state")):null}
                        </li>
                        {/* {useradd.Country ? ( */}
                          <label className="delivery-label">Country: </label>
                        {/* ) : null} */}
                        <li className="add-detail-state-country m7">
                          {/* {useradd.Country} */}
                          {localStorage.getItem('country')? JSON.parse(localStorage.getItem("country")):null}
                        </li>
                        {/* {useradd.Mobile ? ( */}
                          <label className="delivery-label">Phone: </label>
                        {/* ) : null} */}                
                        <li className="add-detail-phone m7">
                          {/* {useradd.Mobile} */}
                          {localStorage.getItem('mobile') ? JSON.parse(localStorage.getItem("mobile")):null}
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <h4> click on change address to add address </h4>
                  )}
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <button className="change-add-btn">Change Address</button>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="cart-total-container">
              <div className="cart-total-header">
                CART TOTAL <hr />
              </div>
              <table className="cart-total">
                <tr className="cart-row">
                  <td className="cart-col">Sub-Total</td>
                  <td className="cart-col">₹{totalq}</td>
                </tr>
                <tr className="cart-row">
                  <td className="cart-col">Delivery Charges</td>
                  <td className="cart-col">₹{deliverycharges}</td>
                </tr>
              </table>
              <hr style={{marginLeft : "10px",marginRight:"10px"}}/>
              <table className="cart-total">
                    
                <tr className="cart-row">
                  <td className="cart-col">Total</td>
                  <td className="cart-col">₹ {totalq}</td>
                </tr>
              </table>
              <div
                className="cart-btn-sec"
                style={{
                  backgroundColor: "#ECF4F4",
                }}
              >
                <button
                  className="buynow-btn"
                  style={{
                    width: "100%",
                    margin: "10px 0px",
                  }}
                >
                  {user && useradd ? (
                    x >= 1 ? (
                      <Razorpay
                        btnText="Place Order"
                        cartProducts={cartProducts.length}
                        totalCartPrice={x}
                        products={products}
                        style={{ width: "20px",backgroundColor: "#b2eeee", }}
                      />
                    ) : (
                      <center>
                        <h2>Cart is Empty!</h2>
                      </center>
                    )
                  ) : (
                    <center>
                      <h2>Please enter address</h2>
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <button className="change-add-btn">Add Address</button>
                      </Link>
                    </center>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </center>
      <Footer />
    </div>
  );
};

export default Cart;
