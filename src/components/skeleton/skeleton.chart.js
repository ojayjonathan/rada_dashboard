import classNames from "classnames";
import React from "react";
import "./index.css";
import SkeletonWrapper from "./skeletonWrapper";

function CardSkeleton({ centerTitle, footer }) {
  const titleClasses = classNames(
    centerTitle && "mx-auto",
    "skeleton",
    "title"
  );
  return (
    <SkeletonWrapper>
      <div className="card-header">
        <div className={titleClasses}></div>
      </div>
      <div className="card-body flex-1">
        <div className="skeleton skeleton_container"></div>
      </div>
      <div className="d-flex justify-content-center mb-2">
        <div className="skeleton small_button mx-3"></div>
        <div className="skeleton small_button mx-3"></div>
      </div>
    </SkeletonWrapper>
  );
}

export default CardSkeleton;
