import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { useCart } from '../Components/ContextReducer';

export default function Navbar(props) {
  const [cartview, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic fs-3" to="#">
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken")) ? (
                <li className="nav-item">
                  <Link className="nav-link fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              ) : null}
            </ul>
            <div className="d-flex align-items-center">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link className="btn btn-light mx-2 rounded-pill px-4" to="/Login">
                    Login
                  </Link>
                  <Link className="btn btn-light mx-2 rounded-pill px-4" to="/createuser">
                    SignUp
                  </Link>
                </>
              ) : (
                <>
                  <div
                    onClick={() => { setCartView(true); }}
                    className="btn btn-light mx-2 position-relative rounded-pill px-4"
                  >
                    My Cart
                    <Badge pill bg="danger" style={{
                      position: "absolute", top: "-5px", right: "-10px", padding: "0.4em 0.6em"
                    }}>
                      {data.length}
                    </Badge>
                  </div>
                  {cartview ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                  <button
                    className="btn btn-danger mx-2 rounded-pill px-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          background-color: #28a745;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .navbar-brand {
          font-size: 1.8rem;
          font-weight: 600;
          color: white;
        }

        .nav-link {
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #ffeb3b;
        }

        .btn-light {
          background-color: #ffffff;
          color: #28a745;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .btn-light:hover {
          background-color: #28a745;
          color: #fff;
        }

        .btn-danger {
          background-color: #f44336;
          color: #fff;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .btn-danger:hover {
          background-color: #d32f2f;
          color: #fff;
        }

        .navbar-toggler-icon {
          background-color: #fff;
        }
      `}</style>
    </div>
  );
}
