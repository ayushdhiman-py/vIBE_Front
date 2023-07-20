import axios from "axios";

const senddata = (json)=> {
 
  
  let paymentid = localStorage.getItem("browser_tahelka");
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     setStatus("Geolocation is not supported by your browser");
  //   } else {
  //     setStatus("Locating...");
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setStatus(null);
  //         setLat(position.coords.latitude);
  //         setLng(position.coords.longitude);
  //       },
  //       () => {
  //         setStatus("Unable to retrieve your location");
  //       }
  //     );
  //   }
  // };

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       lat = position.coords.latitude;
  //       long = position.coords.longitude;
        
  //     },
  //     function () {
  //       //error
  //     }
  //   );
  // };
  let pickUpDetails = {
    pickup_details: [
      {
        reference_id: `${json.userid_id}.${paymentid}.${json.product_id}`,
        address: {
          street_address_1: localStorage.getItem("street"),
          landmark: localStorage.getItem("landmark"),
          city: localStorage.getItem("city"),
          state: localStorage.getItem("state"),
          pincode: localStorage.getItem("pincode"),
          country: localStorage.getItem("country"),
          lng: localStorage.getItem("longitude"),
          lat: localStorage.getItem("latitude"),
          contact_details: {
            name: localStorage.getItem("name"),
            phone_number: localStorage.getItem("mobile"),
          },
        },
        otp_required: true,
      },
    ],
  };

  const address = JSON.stringify(pickUpDetails);

  // let address =
  //   localStorage.getItem("street") +
  //   " " +
  //   localStorage.getItem("street") +
  //   " " +
  //   localStorage.getItem("city") +
  //   " " +
  //   localStorage.getItem("state") +
  //   " " +
  //   localStorage.getItem("country");

  console.log("inside send.jsx", json);
  console.log("inside send.jsx price", json.productPrice);

  let sizeGot = json.size || localStorage.getItem("size");
  console.log(sizeGot);

  console.log(paymentid);
  axios
    .post("https://api.vIBE.com/items/inventory", {
      id: `${json.userid_id}.${paymentid}.${json.product_id}`,
      status: "published",
      sort: null,
      user_created: null,
      date_created: "2022-08-21T17:49:07.109Z",
      user_updated: null,
      date_updated: null,
      payment_id: `${paymentid}`,
      customer_id: `${json.userid_id}`,
      price: `${json.productPrice}`,
      category: `${json.categoryId}`,
      image_of_design: `${json.banner}`,
      color: "black",
      size: sizeGot,
      ordered_on: `${date}T${time}`,
      in_progress_status: false,
      order_completed_status: false,
      address_of_delivery: `${address}`,
      dispatch_date: "2022-08-30T11:49:00",
      dispatch_status: false,
      order_delivered_on: "2022-08-31",
      seller_id: "10001seller1001",
      cancel_status: false,
      return_status: false,
      date_of_cancel: "2022-08-31",
      date_of_return: "2022-08-31",
      date_of_refund: "2022-08-31",
      quantity: `${json.quantity}`,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
}


// const address=()=>{

//   let pickUpDetails = {
//     pickup_details: [
//       {
        
//         address: {
//           street_address_1: localStorage.getItem("street"),
//           landmark: localStorage.getItem("landmark"),
//           city: localStorage.getItem("city"),
//           state: localStorage.getItem("state"),
//           pincode: localStorage.getItem("pincode"),
//           country: localStorage.getItem("country"),
//           lng:localStorage.getItem("longitude"),
//           lat: localStorage.getItem("latitude"),
//           contact_details: {
//             name: localStorage.getItem("name"),
//             phone_number: localStorage.getItem("mobile"),
//           },
//         },
//         otp_required: true,
//       },
//     ],
//   };

//   const address = JSON.stringify(pickUpDetails);
//   console.log(address,"from send.jsx");
//   console.log("lat-long");
// }
export {senddata};