import classNames from "classnames";
import React, { HtmlHTMLAttributes } from "react";
import CircularProgressLoader from "./loader";

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label: string;
  loading: boolean;
  size?: "small" | "medium" | "large";
  buttonType: "primary" | "success" | "secondary" | "danger";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}
const buttonSizeClass = {
  small: "btn-sm",
  medium: "",
  large: "btn-lg",
};
const buttonTypes = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  success: "btn-success",
  danger: "btn-danger",
};

const Button: React.FC<Props> = ({
  size = "medium",
  buttonType,
  className,
  loading = false,
  ...props
}) => {
  const c = classNames(
    "btn",
    className,
    buttonSizeClass[size],
    buttonTypes[buttonType],
    "fs-6",
    "py-1",
    "px-4"
  );
  return (
    <button {...props} className={c} type={props.type}>
      {!loading && props.label}
      {loading && <CircularProgressLoader />}
    </button>
  );
};

export default Button;
