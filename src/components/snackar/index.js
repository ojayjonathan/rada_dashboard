import classNames from "classnames";
import React from "react";

export const snackBarClasses = {
  primary: "alert-primary",
  secondary: "alert-secondary",
  success: "alert-success",
  danger: "alert-danger",
  warning: "alert-warning",
  info: "alert-info",
};

function SnackBar({ snackbar }) {
  const classes = classNames(
    "col-12",
    "my-2 py-md-0 col-md-9",
    "offset-md-3",
    "col-lg-10",
    "offset-lg-2",
    "alert",
    snackbar.className,
    "text-center",
    "container"
  );
  const [state, setState] = React.useState();
  React.useEffect(() => {
    setState("d-block");
    const timeId = window.setTimeout(
      () => setState("d-none"),
      snackbar.duration || 5000
    );
    return () => {
      window.clearTimeout(timeId);
    };
  }, [snackbar]);
  return (
    <div className={`fixed-top ${state}`} style={{ zIndex: "10000" }}>
      <div className={classes} role="alert">
        <p className="my-2">{snackbar.message}</p>
      </div>
    </div>
  );
}

export default SnackBar;
