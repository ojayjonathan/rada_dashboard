import React from "react";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../utils/constants";
import { useLocation } from "react-router-dom";
export interface ErrorProps {
  message?: string;
  status?: string | number;
  nextUrl?: string;
  title?: string;
}
const ErrorPage = () => {
  const {
    message,
    nextUrl,
    status = "ERROR",
    title = "An error occured",
  } = useLocation().state as ErrorProps;

  return (
    <div className="container mx-auto d-flex flex-column justify-content-center h-100 align-items-center">
      <div>
        <h1 className="text-muted">{status}</h1>
      </div>
      <h3>{title}</h3>
      <div>
        <p className="text-muted">{message}</p>
      </div>
      <div>
        {nextUrl && (
          <Link className="btn btn-primary px-5" to={nextUrl}>
            Retry
          </Link>
        )}
        <Link className="btn btn-primary px-5" to={APP_ROUTES.home}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
