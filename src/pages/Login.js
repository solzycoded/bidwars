import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="d-flex align-items-center justify-content-center w-100-p">
            <div className="login-section">
                <form onSubmit="login" autoComplete="off">

                    <div className="text-center mb-20">
                        <h3>Login</h3>
                    </div>

                    <div>
                        {/* <div className="text-danger mb-2 text-center" v-show="error!==''">{{ error }}</div> */}
                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="username">
                                Username
                            </label>
                            <input className="form-control"
                                type="text"
                                name="username"
                                id="username" required />
                        </div>

                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="username">
                                Password
                            </label>
                            <input className="form-control"
                                type="password"
                                name="password"
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