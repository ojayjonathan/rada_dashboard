import React from "react";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../utils/constants";

function PageNotFound() {
  return (
    <div className="container mx-auto d-flex flex-column justify-content-center h-100 align-items-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={128}
          height={128}
          viewBox="0 0 128 128"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M0 0h128v128H0z" />
            <circle
              cx="82.667"
              cy="50.667"
              r={8}
              fill="#E2E6EA"
              fillRule="nonzero"
            />
            <circle
              cx="45.333"
              cy="50.667"
              r={8}
              fill="#E2E6EA"
              fillRule="nonzero"
            />
            <path
              fill="#E2E6EA"
              fillRule="nonzero"
              d="M63.947 10.667c-29.44 0-53.28 23.893-53.28 53.333 0 29.44 23.84 53.333 53.28 53.333 29.493 0 53.386-23.893 53.386-53.333 0-29.44-23.893-53.333-53.386-53.333zm.053 96c-23.573 0-42.667-19.094-42.667-42.667S40.427 21.333 64 21.333 106.667 40.427 106.667 64 87.573 106.667 64 106.667zm0-32c-12.427 0-23.04 7.733-27.307 18.666H45.6c3.68-6.346 10.507-10.666 18.4-10.666 7.893 0 14.667 4.32 18.4 10.666h8.907C87.04 82.4 76.427 74.667 64 74.667z"
            />
          </g>
        </svg>
      </div>
      <h3>Page Not Found</h3>
      <div>
        <p className="text-muted">
          You may have mistyped the address or the page may have moved.
        </p>
      </div>
      <div>
        <Link className="btn btn-primary px-5" to={APP_ROUTES.home}>
          Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
