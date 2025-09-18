import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchNoAuth } from "../assets/util/FetchRequest.js";

const Signup = () => {
    const [email, setEmail]           = useState("");
    const [username, setUsername]     = useState("");
    const [password, setPassword]     = useState("");
    const [rePassword, setRePassword] = useState("");

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handlePassword = (e, forField) => {
        if(forField==="password") {
            setPassword(e.target.value);
        }
        else {
            setRePassword(e.target.value);
        }

        passwordAndRePasswordValid();
    }

    const passwordAndRePasswordValid = () => {
        if(password!==rePassword){
            const errMsg = "Password and Re-password are not the same.";
            const exists = errors.find(v => v===errMsg);

            if(!exists){
                setErrors([...errors, errMsg]);
            }

            return false;
        }

        return true;
    }

    const submitSignup = async (e) => {
        e.preventDefault();

        const passwordIsValid = passwordAndRePasswordValid();

        if(!passwordIsValid) { // if password and repassword aren't the same prevent submission
            return;
        }

        const failureFn = async (res = null) => { //when the request fails
            // display the errors
            const { errors } = (await res.json());
            const altErrors  = [];

            for (const err of errors) {
                altErrors.push(err.msg);
            }

            setErrors(altErrors);
        }

        const successFn = async (res = null) => { // when the request is a success
            setErrors([]); // reset the error list everytime a request is submitted

            // THE SUCCESS MESSAGE WILL GO HERE
            navigate("/login"); // go to the login page, after successful signup
        }

        fetchNoAuth(
            "http://localhost:4500/auth/signup", 
            { username, email, password }, 
            "POST", 
            failureFn, 
            successFn
        );
    }

    return (
        <div className="d-flex align-items-center justify-content-center w-100-p">
            <div className="login-section">
                <form onSubmit={submitSignup} autoComplete="off">
 
                    <div className="text-center mb-20">
                        <h3>Signup</h3>
                        <div className="text-danger mb-2 text-center">
                            {
                                errors.map((err, i) => {
                                    return <p key={i}>{ err }</p>
                                })
                            }
                        </div>
                    </div>

                    <div>
                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="email">
                                Email Address
                            </label>
                            <input className="form-control"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email" required />
                        </div>

                        <div className="mb-3">
                            <label
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="username">
                                Username
                            </label>
                            <input className="form-control"
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="username" required />
                        </div>

                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="password">
                                Password
                            </label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => handlePassword(e, "password")}
                                id="password" required />
                        </div>
                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="re-password">
                                Re-enter Password
                            </label>
                            <input
                                className="form-control"
                                type="password"
                                name="re-password"
                                aria-label="Re-enter Password"
                                value={rePassword}
                                onChange={(e) => handlePassword(e, "re-password")}
                                id="re-password" required />
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" 
                            className="btn text-white rounded-pill fw-bold bg-danger fs-5 w-100-p">
                            Sign up
                        </button>

                        <p>Already have an account? <Link to="/login" className="text-decoration-none text-danger">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;