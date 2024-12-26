import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../Screens/Cart'
import { useCart } from '../Components/ContextReducer';




export default function Navbar(props) {
const [cartview,setCartView]= useState(false)
const navigate = useNavigate();
let data = useCart();
  const handleLogout =()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
//  const items = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to="#">
            Foodie
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 ">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken"))?
               <li className="nav-item">
               <Link className="nav-link active fs-5" aria-current="page" to="/">
                 My Orders
               </Link>
             </li>:""
              }
            </ul>
            {(!localStorage.getItem("authToken"))?
            <div className="d-flex">
            
              <Link className="btn bg-white text-success mx-1"  to="/Login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">
                SignUp
              </Link>
            </div>
             :
             <div> <div onClick={()=>{setCartView(true)}}className="btn bg-white text-success mx-2">
             My Cart
             <Badge pill bg="danger" style={{top:"-1px" , left:"5px" , position:"relative",padding: "0.4em 0.6em"}}>{data.length}</Badge>
         </div>
         {cartview ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
         <button className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                Logout
            </button>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}