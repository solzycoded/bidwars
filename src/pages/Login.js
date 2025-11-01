import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchNoAuth } from "../assets/util/FetchRequest.js";
import { getAuthDta, setAuthData } from "../assets/util/Auth.js";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword]               = useState("");
    const [error, setError]                     = useState("");

    const submitLogin = async (e) => {
        e.preventDefault();

        const failureFn = () => {
            setError("Invalid Login Credentials.");
        }

        const successFn = async (res) => {
            setError("");

            const { data } = await res.json();

            setAuthData({ token: data.token, username: data.username, role: data.role });
            alert("Login was successful!");
            console.log(getAuthDta());
            // const auth     = JSON.stringify({ token: data.token, username: data.username, role: data.role });
            // localStorage.setItem("auth", auth); // ✅ store JWT
        }

        fetchNoAuth("auth/login", { usernameOrEmail, password }, 'POST', failureFn, successFn);
    }

    return (
        <div className="d-flex align-items-center justify-content-center w-100-p">
            <div className="login-section">
                <form onSubmit={submitLogin} autoComplete="off">

                    <div className="text-center mb-20">
                        <h3>Login</h3>
                    </div>

                    <div>
                        <div className="text-danger mb-2 text-center">{ error }</div>
                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="usernameOrEmail">
                                Username / Email-address
                            </label>
                            <input className="form-control"
                                type="text"
                                name="usernameOrEmail"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                id="usernameOrEmail" required />
                        </div>

                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="password">
                                Password
                            </label>
                            <input className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password" required />
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" 
                            className="btn text-white rounded-pill fw-bold bg-danger fs-5 w-100-p">
                            Login
                        </button>

                        <p>Don't have an account yet? <Link to="/signup" className="text-decoration-none text-danger">Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;