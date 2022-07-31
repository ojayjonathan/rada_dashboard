import SkeletonWrapper from "../../skeleton/skeletonWrapper";

const ContactSkeleton = () => {
  return (
    <div
      className=" mb-3 "
      style={{ height: "120px" }}
    >
      <div className="me-3 position-relative">
        <SkeletonWrapper>
          <div className="card" style={{ height: "120px" }}>
            <div className="card-body d-flex">
              <div className="w-100">
                <div className="skeleton title"></div>
                <div className="ms-2 text-muted">
                  <div className="d-flex align-items-center">
                    <span
                      className="skeleton mt-1"
                      style={{ width: "24px", height: "24px" }}
                    ></span>
                    <span
                      className="skeleton ms-2 mt-1"
                      style={{ width: "100px", height: "16px" }}
                    ></span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span
                      className="skeleton mt-1"
                      style={{ width: "24px", height: "24px" }}
                    ></span>
                    <span
                      className="skeleton ms-2 mt-1"
                      style={{ width: "100px", height: "16px" }}
                    ></span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <span
                  className="skeleton mt-1"
                  style={{ width: "24px", height: "24px" }}
                ></span>
                <span
                  className="skeleton mt-1"
                  style={{ width: "24px", height: "24px" }}
                ></span>
              </div>
            </div>
          </div>
        </SkeletonWrapper>
      </div>
    </div>
  );
};
export default ContactSkeleton;
