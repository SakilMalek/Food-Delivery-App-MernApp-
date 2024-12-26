import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "" // Ensure consistency
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation,
                }),
            });
    
            const json = await response.json();
            console.log(json); // Log the response to see the details
    
            if (!json.success) {
                alert(json.message || "Enter valid credentials");
            } else {
                // Handle successful signup
                alert("User created successfully");
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
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name='name'
                            value={credentials.name}
                            className="form-control"
                            placeholder="Enter your Name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            name='email'
                            value={credentials.email}
                            className="form-control"
                            id="exampleInputEmail1"
                            onChange={onChange}
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            onChange={onChange}
                            name='password'
                            value={credentials.password}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="location">Address</label>
                        <textarea
                            name='geolocation' // Keep this consistent with state
                            onChange={onChange}
                            value={credentials.geolocation} // Fix the state field name
                            className="form-control"
                            placeholder="Address"
                        />
                    </div>
                    <button type="submit" className="btn m-3 btn-success">
                        Submit
                    </button>
                    <Link to="/login" className='m-3 btn btn-danger'>
                        Already a user
                    </Link>
                </form>
            </div>
        </>
    );
}
 