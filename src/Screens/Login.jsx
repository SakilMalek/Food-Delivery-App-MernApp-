import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {

     const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
let navigate =useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Corrected typo

        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                })
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter valid credentials");
            }
            if (json.success) {
              localStorage.setItem("authToken" , json.authToken)
              navigate("/");
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
                
                    <button type="submit" className="btn m-3 btn-success">
                        Login
                    </button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>Register
                    </Link>
                </form>
            </div>
      </>
    
  )
}
