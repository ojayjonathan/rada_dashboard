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
export interface SnackBar {
  message?: string;
  className?: "primary" | "warning" | "info" | "secondary" | "success" | "danger";
  duration?: number;
}

function SnackBarComponent({ message, className, duration = 5000 }: SnackBar) {
  const classes = classNames(
    "col-12",
    "my-2 py-md-0 col-md-9",
    "offset-md-3",
    "col-lg-10",
    "offset-lg-2",
    "alert",
    className == null ? "" : snackBarClasses[className],
    "text-center",
    "container"
  );
  const [visible, setState] = React.useState<boolean>(false);

  React.useEffect(() => {
    setState(true);
    const timeId = window.setTimeout(() => setState(false), duration);
    return () => {
      window.clearTimeout(timeId);
    };
  }, [duration]);

  return (
    <div
      className={`fixed-top ${visible ? "d-block" : "d-none"}`}
      style={{ zIndex: "10000" }}
    >
      <div className={classes} role="alert">
        <p className="my-2">{message}</p>
      </div>
    </div>
  );
}

export default SnackBarComponent;
