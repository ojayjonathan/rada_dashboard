import React from "react";
import { login } from "../../../utils/services/auth.services";
import Layout from "../../layout";
import "./index.css";
import { useHistory } from "react-router-dom";
import { APP_ROUTES } from "../../../utils/constants";

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
    <div className="col-12 col-md-8 col-xl-8 mt-5  mx-auto">
      <div className="card card1 mx-3 px-4">
        <div className="row justify-content-center my-auto">
          <form onSubmit={submitForm}>
            <div className="col-md-8 col-10 col-12 my-5 mx-auto">
              <div className="row justify-content-center px-3 mb-3">
                {/* TODO replace with rada logo */}
                <img
                  alt="Rada logo"
                  id="logo"
                  src="https://i.imgur.com/PSXxjNY.png"
                />
              </div>
              <h3 className="text-center heading">Rada Admin</h3>
              <h6 className="msg-info">Please login to your account</h6>
              {errors && <small className="text-danger">{errors}</small>}
              <div className="form-group my-2">
                <label className="form-control-label text-muted">Email</label>
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
  );
}

export default Login;
