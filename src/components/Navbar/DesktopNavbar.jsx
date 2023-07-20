import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

export const DeskTopNavbar = ({ user }) => {
  return (
    <div
      className="desktop-nav"
      style={{
        alignContent: "center",
        display: "flex",
        textAlign: "center",
        verticalAlign: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div
        className="nav-left-item nav-left-user-item"
        style={{ fontSize: "30px", fontWeight: "bold" }}
      >
        Hi, {user}
      </div>
      <Link to="/cart">
        <div className="nav-right-item">
          <BsHandbag size={30} />
        </div>
      </Link>
      <Link to="/whishlist">
        <div className="nav-right-item">
          <AiOutlineHeart size={30} />
        </div>
      </Link>
      <Link to="/profile">
        <div className="nav-right-item">
          <CgProfile size={30} />
        </div>
      </Link>
      <Link to="/trackOrder">
        <div className="nav-right-item" style={{ fontSize: "20px" }}>
          Orders
        </div>
      </Link>
    </div>
  );
};
