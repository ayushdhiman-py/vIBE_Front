import "./App.css";
import axios from "axios";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import Productpage from "./pages/ParticularCategory";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TrackOrder from "./pages/TrackOrder";
import { Profile } from "./pages/Profile";
import Whishlist from "./pages/Whishlist";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";
import NotFound from "./pages/NotFound";
import ParticularProduct from "./pages/ParticularProduct";
import SendImage from "./pages/SendImage";
import LocationPage from "./pages/Locationpage";
import { auth, fs } from "./config/Config";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
// import { Navbar } from "./components/Navbar/Navbar";
import Privacy from "./pages/Privacy";
import Tnc from "./pages/TnC";

function App() {
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

  const [backtop, setbacktop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setbacktop(true);
      } else {
        setbacktop(false);
      }
    });
  }, []);
  const gototop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function GetUserId() {
    const [uid, setuid] = useState(null);
    const [email, setemail] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setuid(user.uid);
          setemail(user.email);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserId();

  // Add to cart
  let Product = {};
  const cart = fs.collection("cart");
  function addToCart(d, selectedsize) {
  
    if (uid !== null) {
      Product["size"] = selectedsize;
      Product["image"] = d.image;
      Product["id"] = d.id;
      Product["quantity"] = 1;
      Product["name"] = d.name;
      Product["price"] = d.price;
      Product["total_prod_price"] = Product.quantity * Product.price;
      cart
        .doc("USER_ID = " + uid + ` PRODUCT_ID = ${d.id}`)
        .set(Product)
        // .then(() => {
        //   console.log("successfully added to cart");
        // });
      // const url = "https://api.vIBE.com/items/cart/A4BwVA8gLzRY0slICNJOXugFLSU2";
      // console.log(Product,"api");
      // axios.get(url).then(data=>{
      //   console.log(data.data,"data api");
      // })
      // axios.post(url,Product).then(res=>{
      //   console.log(res,"api");
      // })
      // .catch(err=>{
      //   console.log(err,"api")
      // })
    } else {
      navigate("/login");
    }
  }
  // Add to whishlist
  let WhishlistProduct = {};
  const Whishlistcart = fs.collection("whishlist");
  function addToWhishlist(datas, selectedsize) {
   

    if (uid !== null) {
      WhishlistProduct["size"] = selectedsize;
      WhishlistProduct["image"] = datas.image;
      WhishlistProduct["id"] = datas.id;
      WhishlistProduct["name"] = datas.name;
      WhishlistProduct["price"] = datas.price;
      // WhishlistProduct["total_prod_price"] =
      //   WhishlistProduct.quantity * WhishlistProduct.price;
      Whishlistcart.doc("USER_ID = " + uid + ` PRODUCT_ID = ${datas.id}`)
        .set(WhishlistProduct)
        // .then(() => {
        //   console.log("successfully added to Whishlist");
        // });
    } else {
      navigate("/login");
    }
  }

  localStorage.setItem("paymentdone", false);

  return (
    <div className="App">
      {/* <Navbar user={user} /> */}
      <Navbar user={user} />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termsncondition" element={<Tnc />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/productpage/:category_id"
          element={<Productpage addToCart={addToCart} />}
        />
        <Route
          path="/products/:id"
          element={
            <ParticularProduct
              addToCart={addToCart}
              addToWhishlist={addToWhishlist}
            />
          }
        />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/whishlist"
          element={<Whishlist userid={uid} addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart userid={uid} />} />
        <Route path="/locationpage" element={<LocationPage />} />
        <Route path="/sendimage" element={<SendImage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
