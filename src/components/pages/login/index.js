import React from "react";
import { login } from "../../../utils/services/user.services";
import "./index.css";
import { useHistory } from "react-router-dom";
import { APP_ROUTES } from "../../../utils/constants";
import logo from "../../../assets/images/android-icon-192x192.png";

function Login() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const submitForm = async (e) => {
    e.preventDefault();
    const result = await login(state);
    if (result.success) {
      history.push(APP_ROUTES.home);
    } else {
      setErrors(result.message);
    }
  };

  return (
    <div className="container login">
      <div className="d-flex mt-5">
        <div
          className="col-md-6 col-lg-4 d-none d-md-flex align-items-center justify-content-center"
          style={{
            background: "var(--primary)",
            alignSelf: "stretch",
          }}
        >
          <div className="justify-content-center px-3 mb-3">
            <img alt="Rada logo" id="logo" src={logo} />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-8  mx-auto">
          <div className="card card1  px-4">
            <div className="row justify-content-center my-auto">
              <form onSubmit={submitForm}>
                <div className="col-md-8 col-10 col-12 my-5 mx-auto">
                  <h3 className="text-center heading">Rada Admin</h3>
                  <h6 className="msg-info">Please login to your account</h6>
                  {errors && <small className="text-danger">{errors}</small>}
                  <div className="form-group my-2">
                    <label className="form-control-label text-muted">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      value={state.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label className="form-control-label text-muted">
                      Password
                    </label>
                    <input
                      required
                      type="password"
                      id="psw"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      value={state.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row justify-content-center my-3 px-3">
                    <button className="btn btn-primary">Login</button>
                  </div>
                  <div className="row justify-content-center my-2">
                    {/* TODO - redirect user to login */}
                    <a href="change/password">
                      <small className="text-muted">Forgot Password?</small>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
