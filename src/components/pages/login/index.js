import React from "react";
import Layout from "../../layout";
import "./index.css";

function Login() {
  return (
    <div className="col-12 col-md-8 col-xl-8 mt-5  mx-auto">
      <div className="card card1 mx-3 px-2">
        <div className="row justify-content-center my-auto">
          <div className="col-md-8 col-10 col-12 my-5">
            <div className="row justify-content-center px-3 mb-3">
              <img id="logo" src="https://i.imgur.com/PSXxjNY.png" />
            </div>
            <h3 className="mb-5 text-center heading">We are Tidi</h3>
            <h6 className="msg-info">Please login to your account</h6>
            <div className="form-group my-2">
              <label className="form-control-label text-muted">Username</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Phone no or email id"
                className="form-control"
              />
            </div>
            <div className="form-group my-2">
              <label className="form-control-label text-muted">Password</label>
              <input
                type="password"
                id="psw"
                name="psw"
                placeholder="Password"
                className="form-control"
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
        </div>
      </div>
    </div>
  );
}

export default Login;
