import React from "react";
import "./ProductCard.css";
import CircleIcon from "@mui/icons-material/Circle";

const ProductCard = () => {
  return (
    <>
      <div className="product-card-wrapper">
        <div className="product-card-main-content">
          <div className="product-card-img-slider">
            <img className="product-card-img" src="" alt="" />
          </div>
        </div>
        <div className="product-card-free-del-text">Free Delivery</div>
        <div className="product-card-fav-icon">❤️</div>
        <div className="product-card-header">
          <div className="product-card-heading">Solid Unisex White T-shirt</div>
          <div className="product-card-manufac">Stubborn Factory</div>
          <div className="product-card-price-section">
            <div className="product-card-price-text">₹ 599</div>
            <div className="product-card-strike-price">₹ 1599</div>
            <div className="product-card-discount">75%</div>
          </div>
          <div className="product-card-color-select">
            <div className="product-card-color-item">
              <CircleIcon
                style={{
                  cursor: "pointer",
                  color: "white",
                  border: "1px solid black",
                  borderRadius: "20px",
                  fontSize: "20px",
                }}
              ></CircleIcon>
              <CircleIcon
                style={{
                  color: "green",
                  fontSize: "20px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              ></CircleIcon>
              <CircleIcon
                style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
              ></CircleIcon>
              <CircleIcon
                style={{
                  color: "#FFAA15",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              ></CircleIcon>
              <CircleIcon
                style={{ color: "gray", fontSize: "20px", cursor: "pointer" }}
              ></CircleIcon>
              <CircleIcon
                style={{ color: "#black", fontSize: "20px", cursor: "pointer" }}
              ></CircleIcon>
              <div className="product-card-color-item-number">+2</div>
            </div>
            <div className="product-card-size-text">
              Size: XS, S, M, L, XL, XXL
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
