import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageTitle from "../../pageTitle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { EditorData } from "./editor";
import {
  createContent,
  createContentCategory,
  getContentCategories,
} from "../../../utils/services/content.service";
import { snackBarClasses } from "../../snackar";
import { DashboardContext } from "../../dashboard";

export default function ContentEditor() {
  const { showSnackBar } = React.useContext(DashboardContext);
  const [contentCategories, setContentCategories] = React.useState([]);
  React.useEffect(() => {
    const init = async () => {
      const result = await getContentCategories();
      if (result.data) {
        setContentCategories(result.data);
        setMetadata({ ...metadata, category: result.data[0]._id });
      }
    };
    init();
  }, []);
  const createContentInputRef = React.useRef();
  const addCategory = async () => {
    const result = await createContentCategory(
      createContentInputRef.current.value
    );
    if (result.data) {
      setContentCategories([...contentCategories, result.data]);
    }
  };
  const quill = React.useRef();
  const location = useLocation();
  const [metadata, setMetadata] = React.useState({
    title: "",
    category: "",
    thumbnail: "",
  });

  const changeMetaDataData = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    if (validate()) {
      const unprivilegedEditor = quill.current.makeUnprivilegedEditor(
        quill.current.getEditor()
      );
      const editorData = new EditorData(
        metadata,
        unprivilegedEditor.getContents()
      );
      const formData = await editorData.generateFormData();
      const res = await createContent(formData);
      if (res.data) {
        showSnackBar(
          res.data.message || "Content created successfuly",
          snackBarClasses.success
        );
      } else {
        showSnackBar(res.message, snackBarClasses.danger);
      }
    }
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [ {
        color: [
          "#000000",
          "#3d5170",
          "#6c757d",
          "#e60000",
          "#198754",
          "#2dcb7e",
          "#ffff00",
          "#0066cc",
        ],
      },
        "link",
        "image",
        
      ],
    ],
  };
  const [errors, setErrors] = React.useState({
    title: null,
    thumbnail: null,
    category: null,
    content: null,
  });
  const validate = () => {
    let thumbnail, category, title;
    if (!metadata.category) {
      category = "Content Category is required";
    }
    if (!metadata.thumbnail) {
      thumbnail = "Thumbnail is required";
    }
    if (!metadata.title) {
      title = "Title is required";
    }

    if (thumbnail || category || title) {
      setErrors({
        thumbnail,
        category,
        title,
      });
      return false;
    } else {
      setErrors({
        title: null,
        thumbnail: null,
        category: null,
        content: null,
      });
      return true;
    }
  };
  const reset = () => {
    formRef.current.reset();
    setMetadata({});
    setErrors({});

    quill.current.getEditor().setContents([]);
  };
  const formRef = React.useRef();
  return (
    <div className="container">
      <PageTitle
        title={location.state ? "Edit Content" : "Create Content"}
        sutitle="content"
      />
      <form className="add-new-post row mb-3" ref={formRef}>
        <div className="col-12 col-lg-9 mb-5">
          <div className="add-new-post card">
            <div className="card-body">
              {errors.title && (
                <small className="text-danger d-block">{errors.title}</small>
              )}
              <label for="title" className="form-label">
                Title
              </label>
              <input
                id="title"
                value={metadata.title}
                className="mb-3 form-control"
                placeholder="Your Title"
                onChange={changeMetaDataData}
                name="title"
                required
              />
              {errors.thumbnail && (
                <small className="text-danger d-block">
                  {errors.thumbnail}
                </small>
              )}
              <label for="thumbail" className="form-label">
                Thumbnail
              </label>
              <input
                required
                className="mb-3 form-control"
                placeholder="thumbnail"
                type="file"
                id="thumbnail"
                onChange={(e) => {
                  if (e.target.files) {
                    setMetadata({ ...metadata, thumbnail: e.target.files[0] });
                  }
                }}
              />
              <ReactQuill
                modules={modules}
                className="add-new-post__editor mb-1"
                placeholder="write something ..."
                ref={quill}
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
              {errors.category && (
                <small className="text-danger d-block">{errors.category}</small>
              )}
              {contentCategories.map((c) => (
                <div className="custom-control custom-checkbox mb-1">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    value={c._id}
                    checked={metadata.category == c._id}
                    name="category"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setMetadata({ ...metadata, category: e.target.value });
                      }
                    }}
                  />
                  <label
                    className="custom-control-label mx-2"
                    htmlhtmlFor="category3"
                  >
                    {c.name}
                  </label>
                </div>
              ))}

              <div className="input-group my-4">
                <input
                  style={{ fontSize: "13px" }}
                  ref={createContentInputRef}
                  className="form-control py-0"
                  placeholder="New category"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-white "
                    type="button"
                    onClick={addCategory}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button
                type="button"
                onClick={reset}
                className="btn btn-danger "
                style={{ fontSize: "13px" }}
              >
                <i className="material-icons" style={{ fontSize: "13px" }}>
                  delete
                </i>
                Clear
              </button>
              <button
                type="submit"
                onClick={submitData}
                className="btn btn-primary "
                style={{ fontSize: "13px" }}
              >
                <i className="material-icons" style={{ fontSize: "13px" }}>
                  file_copy
                </i>
                Publish
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
