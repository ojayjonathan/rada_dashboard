import React from "react";
import "./index.css";

const SkeletonWrapper = ({ children }) => {
  return (
    <div className="skeleton-wrapper d-flex flex-column">
      {children}
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonWrapper;
