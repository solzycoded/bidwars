import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:4500/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usernameOrEmail, password }),
        });

        console.log(res);
        // if (!res.ok) {
        //     alert("Login failed");
        //     return;
        // }

        // const data = await res.json();
        // localStorage.setItem("token", data.token); // ✅ store JWT
    }

    return (
        <div className="d-flex align-items-center justify-content-center w-100-p">
            <div className="login-section">
                <form onSubmit={submitLogin} autoComplete="off">

                    <div className="text-center mb-20">
                        <h3>Login</h3>
                    </div>

                    <div>
                        {/* <div className="text-danger mb-2 text-center" v-show="error!==''">{{ error }}</div> */}
                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="usernameOrEmail">
                                Username / Email-address
                            </label>
                            <input className="form-control"
                                type="text"
                                name="usernameOrEmail"
                                onKeyUp={(e) => setUsernameOrEmail(e.target.value)}
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
                                onKeyUp={(e) => setPassword(e.target.value)}
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