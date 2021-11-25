import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Layout from "../../layout";
import PageTitle from "../../pageTitle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";

export default function ContentEditor() {
  const location = useLocation();
  const [state, setState] = useState({
    title: null,
    content: "Write something here...",
    category: null,
  });
  useEffect(() => {
    if (location.state) {
      setState({
        title: location.state.title,
        content: location.state.content,
        category: location.state.category,
      });
    }
  }, [location]);
  return (
    <Layout>
      <div className="container">
        <PageTitle
          title={location.state ? "Edit Content" : "Create Content"}
          sutitle="content"
        />
        <form className="add-new-post row mb-3">
          <div className="col-12 col-lg-9 mb-5">
            <div className="add-new-post card">
              <div className="card-body">
                <input
                  size="lg"
                  value={state.title}
                  className="mb-3 form-control"
                  placeholder="Your Post Title"
                />
                <ReactQuill
                  className="add-new-post__editor mb-1"
                  value={state.content}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-5">
            <div className="card">
              <div className="card-header">
                <h5>Categories</h5>
              </div>
              <div className="card-body">
                <div className="custom-control custom-checkbox mb-1">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="category3"
                  />
                  <label
                    className="custom-control-label mx-2"
                    htmlFor="category3"
                  >
                    Development
                  </label>
                </div>
                <div className="custom-control custom-checkbox mb-1">
                  <input
                    type="checkbox"
                    className="custom-control-input "
                    checked
                    id="category3"
                  />
                  <label
                    className="custom-control-label mx-2"
                    htmlFor="category3"
                  >
                    Hiv/Aids
                  </label>
                </div>
                <div className="custom-control custom-checkbox mb-1">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="category3"
                  />
                  <label
                    className="custom-control-label mx-2"
                    htmlFor="category3"
                  >
                    Development
                  </label>
                </div>
                <div className="input-group my-4">
                  <input
                    style={{ fontSize: "13px" }}
                    type="text"
                    className="form-control py-0"
                    placeholder="New category"
                    aria-label="Add new category"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-white " type="button">
                      <i className="material-icons">add</i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary ms-auto d-block"
                  style={{ fontSize: "13px" }}
                >
                  <i class="material-icons" style={{ fontSize: "13px" }}>
                    file_copy
                  </i>
                  Publish
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
