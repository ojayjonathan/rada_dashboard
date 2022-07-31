import React from "react";
import "./index.css";
interface Props {
  title: string;
  subtitle: string;
}
const PageTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="page-header mt-5">
      <span className="page-subtitle">{subtitle}</span>
      <h4 className="mb-2">{title}</h4>
    </div>
  );
};

export default PageTitle;
