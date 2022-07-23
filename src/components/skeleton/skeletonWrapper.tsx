import "./index.css";

const SkeletonWrapper = ({ children }: { children: any }) => {
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
