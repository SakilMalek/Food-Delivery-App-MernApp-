import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              id="exampleInputEmail1"
              onChange={onChange}
              placeholder="Enter email"
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              id="exampleInputPassword1"
              onChange={onChange}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn m-3 btn-success"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            Register
          </Link>
        </form>
      </div>
    </>
  );
}
