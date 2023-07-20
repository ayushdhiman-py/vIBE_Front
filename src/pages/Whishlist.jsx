import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toplist from "../components/Toplist";
import { auth, fs } from "../config/Config";
import "./Whishlist.css";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { RiShoppingBagFill } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import Footer from './../components/Footer';
const Whishlist = ({ userid, addToCart }) => {
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
  const [cartproducts, setcartproducts] = useState([]);

  const cart = fs.collection("whishlist");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        cart.onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setcartproducts(newCartProduct);
        });
      } else {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    });
  }, [userid]);
  const handleProductDelete = (p, userid, name, quantity, price, id) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("whishlist")
          .doc("USER_ID = " + userid + ` PRODUCT_ID = ${id}`)
          .delete()
          .then(() => {
            cartproducts = cartproducts.filter((item) => {
              return item.ID !== `USER_ID = ` + userid + ` PRODUCT_ID = ${id}`;
            });
            // console.log("deleted item");
            // cartproducts.pop
          });
      } else {
        // console.log("error");
      }
    });
  };
  let particularProductArray = [];
  // console.log(cartproducts);

  return (
    <div>
      {/* <Toplist /> */}
      <center>
        <div className="wishlist-wrapperr">
          <h1 style={{ fontWeight: "100" }}>Wishlist Items</h1>
          {cartproducts.length < 1 && (
            <h5 style={{ padding: "10px", color: "black" }}>
              Add your favourites here
            </h5>
          )}
          {cartproducts.length >= 1 && (
            <div className="noproduct" style={{marginBottom:"30px"}}>
              <div
                className="cart-item-header"
                style={
                  {
                    // border: "1px solid red",
                  }
                }
              >
                {/* <div className="cart-quan">Quantity</div> */}
              </div>
              {cartproducts.map((data) => {
                const slicedid = data.ID.slice(10, 38);

                if (slicedid === userid) {
                  particularProductArray.push([data.name, userid]);
                  // console.log(data);
                  return (
                    <>
                      <hr style={{ width: "75vw" }} />
                      <div className="wishlist-wrapper">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Link
                            to={`/productpage/${data.category_id}/${data.id}`}
                          >
                            <div className="wish-img">
                              <img
                                src={`${data.image}`}
                                alt=""
                                className="wish-img"
                              />
                            </div>
                          </Link>
                          <hr style={{ marginLeft: "5px" }} />
                          <div className="wish-detail">
                            <div className="wish-text">
                              <b>{data.name}</b>
                            </div>
                            <div className="wish-text">
                              <b> Price :</b> ₹ {data.total_prod_price}
                            </div>
                            <div className="wish-text">
                              {" "}
                              <b>Size :</b> {data.size}
                            </div>
                          </div>
                        </div>
                        <div className="wish-btns">
                          <div
                            onClick={() => {
                              // console.log(data);
                              addToCart(data, data.size);
                              setTimeout(() => {
                                fs.collection("whishlist")
                                  .doc(
                                    "USER_ID = " +
                                      userid +
                                      ` PRODUCT_ID = ${data.id}`
                                  )
                                  .delete();
                                navigate("/cart");
                              }, 1000);
                            }}
                            className="wish-text wish-btn"
                          >
                            Add to <RiShoppingBagFill />
                          </div>
                          <div className="del-icon wish-text">
                            <div
                              // className="product-button-cart"
                              onClick={() =>
                                handleProductDelete(
                                  data,
                                  userid,
                                  data.name,
                                  data.quantity,
                                  data.price,
                                  data.id
                                )
                              }
                              className="wish-text wish-del"
                            >
                              <RiDeleteBinLine />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          )}
        </div>
      </center>
      <Footer />
    </div>
    
  );
};

export default Whishlist;
