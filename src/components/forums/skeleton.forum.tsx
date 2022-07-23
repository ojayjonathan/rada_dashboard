import classNames from "classnames";
import React from "react";
import SkeletonWrapper from "../skeleton/skeletonWrapper";

function ForumSkeleton() {
  const titleClasses = classNames("skeleton", "title");
  return (
    <SkeletonWrapper>
      <div className="card mb-5">
        <div className="card-header">
          <div className={titleClasses}></div>
        </div>
        <div className="card-body flex-1">
          <div className="d-flex mb-3">
            <div className="skeleton avatar"></div>
            <div className="w-100 mx-3">
              <div className="skeleton title mb-2"></div>
              <div className="skeleton description_small "></div>
            </div>
            <div className="skeleton icon"></div>
          </div>
          <div className="d-flex mb-3">
            <div className="skeleton avatar"></div>
            <div className="w-100 mx-3">
              <div className="skeleton title mb-2"></div>
              <div className="skeleton description_small "></div>
            </div>
            <div className="skeleton icon"></div>
          </div>
        </div>
        <div className="mb-2">
          <div className="skeleton small_button mx-3"></div>
        </div>
      </div>
    </SkeletonWrapper>
  );
}

export default ForumSkeleton;
