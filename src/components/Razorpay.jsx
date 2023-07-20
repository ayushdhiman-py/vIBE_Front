import React, { useState } from "react";
import "./Razorpay.css";
import axios from "axios";
import { auth, fs } from "../config/Config";
import { senddata } from "./send";
import { useNavigate } from "react-router-dom";
const Razorpay = ({
  btnText,
  totalCartPrice,
  products,
  cartProducts,
  selectedsize,
  dataToSend,
}) => {
  const navigate = useNavigate();
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
      localStorage.setItem("latitude",position.coords.latitude);
      localStorage.setItem("longitude",position.coords.longitude);
    })
  }else{
    console.log("Geo Location not availabe");
    localStorage.setItem("latitude",null);
    localStorage.setItem("longitude",null);
  }

  console.log(products, "in razorpay jsx");
  console.log(dataToSend, "in razorpay jsx");
  const price = totalCartPrice;
  const [paymentid, setpaymentid] = useState();
  console.log(price);
  console.log(localStorage.getItem("browser_tahelka"), "razorpay line 18");
  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_live_xlfQfSGlO230bx",
      currency: "INR",
      amount: amount * 100,
      name: "vIBE",
      description: "Private Limited",
      image: "../images/logo.png",

      handler: function (response) {
        setpaymentid(response.razorpay_payment_id);
        console.log(response);
        localStorage.setItem("browser_tahelka", response.razorpay_payment_id);
        alert("Payment Successfully");
        localStorage.setItem("paymentdone", true);
        console.log(dataToSend);
        if (dataToSend) {
          senddata(dataToSend);
          console.log(localStorage.getItem("paymentdone"), ": payment done");
          console.log(dataToSend, "Data Sent through particular page");
          localStorage.setItem("paymentdone", false);
          console.log(localStorage.getItem("paymentdone"));
          console.log(
            "USER_ID = " +
              dataToSend.userid_id +
              ` PRODUCT_ID = ${dataToSend.product_id}`
          );
        } else {
          for (const property in products) {
            if (products.hasOwnProperty(property)) {
              console.log(products[property], "inside razorpay");
              console.log(
                "USER_ID = " +
                  products[property].userid_id +
                  ` PRODUCT_ID = ${products[property].product_id}`
              );
              senddata(products[property]);
              console.log("json sent");
              fs.collection("cart")
                .doc(
                  "USER_ID = " +
                    products[property].userid_id +
                    ` PRODUCT_ID = ${products[property].product_id}`
                )
                .delete()
                .then(() => {
                  setTimeout(() => {
                    navigate("/trackOrder");
                  }, 2000);
                  console.log("all cart items deleted!");
                  cartProducts = 0;
                });
            }
          }
          console.log(localStorage.getItem("paymentdone"), ": payment done");
          localStorage.setItem("paymentdone", false);
          console.log(localStorage.getItem("paymentdone"));
        }
      },
      prefill: {
        name: localStorage.getItem("name"),
        contact: localStorage.getItem("mobile"),
        // email: localStorage.getItem("mobile"),
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button className="razorpaycss" onClick={() => displayRazorpay(price)}>
      {btnText}
    </button>
  );
};

export default Razorpay;
