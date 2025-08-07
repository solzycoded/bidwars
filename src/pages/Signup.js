import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="d-flex align-items-center justify-content-center w-100-p">
            <div className="login-section">
                <form onSubmit="signup" autoComplete="off">

                    <div className="text-center mb-20">
                        <h3>Signup</h3>
                    </div>

                    <div>
                        {/* <div className="text-danger mb-2 text-center" v-show="error!==''">{{ error }}</div> */}
                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="email">
                                Email Address
                            </label>
                            <input className="form-control"
                                type="email"
                                name="email"
                                v-model="email"
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
                                v-model="username"
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
                                v-model="password"
                                id="password" required />
                        </div>
                        <div className="mb-3">
                            <label 
                                className="form-label text-capitalize fw-bold" 
                                htmlFor="username">
                                Re-Password
                            </label>
                            <input className="form-control"
                                type="password"
                                name="re_password"
                                v-model="rePassword"
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