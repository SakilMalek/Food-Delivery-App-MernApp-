import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://food-delivery-app-mernapp.onrender.com/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong, please try again.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{

        padding: "15px",
      }}
    >
<div
  className=" shadow-lg"
  style={{
    width: "100%",
    maxWidth: "400px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    padding: "30px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "700px", // Increased height
  }}
>

        <h2
          className="text-center mb-4"
          style={{ color: "#4CAF50", fontWeight: "bold" }}
        >
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label
              htmlFor="name"
              className="fw-bold"
              style={{ color: "#555555" }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              className="form-control"
              placeholder="Enter your Name"
              onChange={onChange}
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="fw-bold"
              style={{ color: "#555555" }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              id="exampleInputEmail1"
              onChange={onChange}
              placeholder="Enter your email"
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="fw-bold"
              style={{ color: "#555555" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
              placeholder="Enter your password"
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label
              htmlFor="location"
              className="fw-bold"
              style={{ color: "#555555" }}
            >
              Address
            </label>
            <textarea
              name="geolocation"
              value={credentials.geolocation}
              className="form-control"
              onChange={onChange}
              placeholder="Enter your address"
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                resize: "none",
              }}
              required
            />
          </div>
          <div
            className="d-flex flex-column gap-2"
            style={{
              marginTop: "20px",
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <button
              type="submit"
              className="btn btn-success"
              style={{
                backgroundColor: "#4CAF50",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
            >
              Sign Up
            </button>
            <Link
              to="/login"
              className="btn btn-outline-danger"
              style={{
                borderRadius: "8px",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "center",
              }}
            >
              Already a User? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
