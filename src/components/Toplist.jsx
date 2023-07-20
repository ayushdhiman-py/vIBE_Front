import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Toplist.css";
const Toplist = () => {
  const [cate, setCate] = useState(null);
  useEffect(() => {
    fetch("https://api.vIBE.com/items/category")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualdata) => {
        setCate(actualdata.data);
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }, []);
  
  return (
    <div className="toplist">
      <ul className="toplist-categories">
        {/* {cate && cate.map((data)=>(
          <Link to="productpage/2">
          <li className='cate' key={data.id}>
              {data.category_name}
          </li>
          </Link>
        ))}  */}
        {/* {
          <>
            <Link style={{textDecoration:"none"}} to="productpage/1">
              <li className="cate" >
                IITD
              </li>
            </Link>
            <Link style={{textDecoration:"none"}} to="productpage/2">
              <li className="cate" >
                ROUND NECK
              </li>
            </Link>
            <Link style={{textDecoration:"none"}} to="productpage/3">
              <li className="cate" >
                OVERSIZED
              </li>
            </Link>
          </>
        } */}
      </ul>
    </div>
  );
};

export default Toplist;
