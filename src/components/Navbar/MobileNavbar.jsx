import { Link } from "react-router-dom";
import{} from "react-icons/ai";
import {BiHomeAlt} from 'react-icons/bi';
import { AiOutlineShoppingCart,AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export const MobileNavbar = () => {
  return (
    <div className="mobile-nav">
      <Link to="/">
        <div className="mobile-nav-item">
          <BiHomeAlt size={25} />
          <span className="mobile-nav-item-font">Home</span>
        </div>
      </Link>
      <Link to="/cart">
        <div className="mobile-nav-item">
          <BsHandbag size={25} />
          <span className="mobile-nav-item-font">Bag</span>
        </div>
      </Link>
      <Link to="/whishlist">
        <div className="mobile-nav-item">
          <AiOutlineHeart size={25} />
          <span className="mobile-nav-item-font">Wishlist</span>
        </div>
      </Link>
      <Link to="/profile">
        <div className="mobile-nav-item">
          <CgProfile size={25} />
          <span className="mobile-nav-item-font">Profile</span>
        </div>
      </Link>
      <Link to="/trackorder">
        <div className="mobile-nav-item">
          <AiOutlineShoppingCart  size={25}/>
          <span className="mobile-nav-item-font">Order</span>
        </div>
      </Link>
    </div>
  );
};
