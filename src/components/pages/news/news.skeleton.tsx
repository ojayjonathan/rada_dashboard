import React from "react";
import SkeletonWrapper from "../../skeleton/skeletonWrapper";

function NewsSkeleton() {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3  position-relative">
      <SkeletonWrapper>
        <div className="card mx-2">
          <div
            className="skeleton"
            style={{ width: "100%", height: "150px" }}
          ></div>
          <div className="card-body">
            <div className="skeleton my-1 title mx-auto"></div>
            <p className="skeleton description_small"></p>
            <div
              className="skeleton"
              style={{ width: "50px", height: "20px" }}
            ></div>
          </div>
        </div>
      </SkeletonWrapper>
    </div>
  );
}

export default NewsSkeleton;
