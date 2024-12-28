import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#4CAF50", fontWeight: "bold" }}>
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label
              htmlFor="exampleInputEmail1"
              style={{ color: "#555555" }}
              className="form-label fw-bold"
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
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
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
          <button
            type="submit"
            className="btn btn-success w-100 mb-3"
            disabled={isLoading}
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <Link
            to="/createuser"
            className="btn btn-outline-danger w-100"
            style={{
              borderRadius: "8px",
              fontWeight: "bold",
              padding: "10px",
              transition: "all 0.3s ease",
            }}
          >
            Register
          </Link>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">
            Forgot your password?{" "}
            <Link to="/resetpassword" className="text-decoration-none" style={{ color: "#4CAF50" }}>
              Click here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
