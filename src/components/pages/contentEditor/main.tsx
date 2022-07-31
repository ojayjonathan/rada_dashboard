import React from "react";
import { useLocation } from "react-router";
// import ReactQuill, { Quill } from "react-quill";
import "quill/dist/quill.snow.css";
import "./index.css";
import { generateFormData } from "./editor";

import {
  ContentMetadata,
  InformationContent,
  QuillDeltaOperation,
} from "../../../types/types";
import PageTitle from "../../ui/pageTitle";
import {
  useContentCategory,
  useCreateContent,
  useCreateContentCategory,
  useUpdateContent,
} from "../../../rest/hooks/content";
import Quill from "quill";

type EditContent = {
  metadata: Partial<ContentMetadata>;
  deltaOps?: QuillDeltaOperation[];
  _id?: string | number;
  [key: string]: any;
};

export default function ContentEditor() {
  const location = useLocation();
  const content: InformationContent | null =
    location.state as InformationContent | null;
  const [editContent, setEditContent] = React.useState<EditContent>({
    metadata: content?.metadata ?? {},
    deltaOps: content?.content,
    ...content,
  });
  const { data: categories, isSuccess: categoryLoaded } = useContentCategory();
  const { mutate: createContent, isSuccess: contentCreated } =
    useCreateContent();
  const { mutate: updateContent, isSuccess: updated } = useUpdateContent();
  const { mutate: createCategory } =
    useCreateContentCategory();

  const changeMetaData = (e: any) => {
    setEditContent({
      metadata: {
        ...editContent.metadata,
        [e.target.name]:
          e.target.type === "file" ? e.target.files[0] : e.target.value,
      },
    });
  };
  const submitData = async (e: any) => {
    e.preventDefault();
    const content = quill.current!.getContents();
    const { metadata, deltaOps, ...other } = editContent;
    const formData = await generateFormData({
      ...other,
      content: content.ops,
      metadata: editContent.metadata as ContentMetadata,
    });
    editContent._id
      ? updateContent({ data: formData, id: editContent._id })
      : createContent(formData);
  };

  const reset = () => {
    form.current!.reset();
    quill.current!.setContents([] as any);
    setEditContent({ metadata: {} });
  };
  const createNewCategory = (e: any) => {
    if (!newCategoryRef.current?.value) return;
    createCategory(newCategoryRef.current!.value);
  };
  const form = React.useRef<HTMLFormElement | null>(null);
  React.useEffect(() => {
    if (contentCreated || updated) {
      reset();
    }
  }, [contentCreated, updated]);

  const newCategoryRef = React.useRef<HTMLInputElement | null>(null);
  const quill = React.useRef<Quill>();
  React.useEffect(() => {
    if (!quill?.current) {
      quill.current = new Quill("#quill", {
        modules: modules,
        placeholder: "Write something",
        theme: "snow",
      });
      if (editContent.deltaOps) {
        quill.current.setContents(editContent.deltaOps as any);
      }
    }
  });
  return (
    <div className="container">
      <PageTitle
        title={location.state ? "Edit Content" : "Create Content"}
        subtitle="content"
      />
      <form className="add-new-post row mb-3" ref={form} onSubmit={submitData}>
        <div className="col-12 col-lg-9 mb-5">
          <div className="add-new-post card">
            <div className="card-body">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                id="title"
                className="mb-3 form-control"
                placeholder="Your Title"
                name="title"
                required
                value={editContent.metadata.title}
                onChange={changeMetaData}
              />

              <label htmlFor="thumbail" className="form-label">
                Thumbnail
              </label>
              <input
                required={!editContent.metadata.thumbnail}
                className="mb-3 form-control"
                placeholder="thumbnail"
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={changeMetaData}
              />
              <div className="add-new-post__editor mb-1">
                <div id="quill"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 mb-5">
          <div className="card">
            <div className="card-header">
              <h5>Categories</h5>
            </div>
            <div className="card-body">
              {!categoryLoaded && <div>Loading...</div>}
              {categories?.contentCategories.map((c, indx) => (
                <div key={indx} className="custom-control custom-checkbox mb-1">
                  <input
                    type="radio"
                    className="custom-control-input"
                    value={c._id}
                    name="category"
                    onChange={changeMetaData}
                    required
                    checked={editContent.metadata.category === c._id}
                  />
                  <label
                    className="custom-control-label mx-2"
                    htmlFor="category3"
                  >
                    {c.name}
                  </label>
                </div>
              ))}

              <div className="input-group my-4">
                <input
                  style={{ fontSize: "13px" }}
                  ref={newCategoryRef}
                  className="form-control py-0"
                  placeholder="New category"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-white "
                    type="button"
                    onClick={createNewCategory}
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
    [
      {
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
