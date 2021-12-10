import React from "react";
import { Content } from "../../../utils/constants";
import { createContent } from "../../../utils/services/content.service";
import InputBox from "../../DefaultContentInputs/InputBox";
import TypeSelection from "../../DefaultContentInputs/TypeSelection";
import PageTitle from "../../pageTitle";
import { Editor } from "./editor";

function ContentEditor() {
  const editor = React.useRef(new Editor());
  const [contentType, setType] = React.useState(Content.Text);
  const [previewContent, setPreviewContent] = React.useState({
    metadata: {},
    content: [],
  });

  const [content, setContent] = React.useState({
    title: "",
    bodyContent: "",
    type: Content.Text,
  });

  const changeType = (e) => {
    setType(e.target.value);
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };
  const saveMetaData = (metadata) => {
    editor.current.metadata = metadata;
    console.log(editor.current.metadata);
  };
  return (
    <div className="container  ">
      <PageTitle title="New Content" sutitle="content Editor" />
      <div>
        <div className="row align-items-start ">
          <div className="col-12 col-lg-6  py-3">
            <ContentMetaData saveMetaData={saveMetaData} />
            <EditorElement
              content={content}
              setType={setType}
              changeType={changeType}
              setContent={setContent}
              editor={editor.current}
              contentType={contentType}
              setPreviewContent={setPreviewContent}
            />
          </div>
          <div className="col-12 col-lg-6  py-3 ">
            <span className="page-subtitle">Preview</span>
            <div className="card">
              <PreviewContent content={previewContent} />
              <div className=" d-flex">
                <button
                  onClick={() =>
                    document.getElementById("content").scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  type="submit"
                  className="btn btn-primary d-block mx-3 mb-3 w-50"
                >
                  Continue
                </button>
                <button
                  onClick={() =>
                    createContent(editor.current.generateFormData())
                  }
                  type="submit"
                  className="btn btn-primary d-block mx-3 mb-3 w-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentEditor;

function EditorElement({
  editor,
  content,
  changeType,
  setContent,
  contentType,
  setPreviewContent,
  setType,
}) {
  const addContent = (e) => {
    if (contentType !== Content.Img) {
      setContent({
        ...content,
        [e.target.name]: e.target.value,
      });
    } else {
      setContent({
        ...content,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  return (
    <div className="card mt-3" id="content">
      <form
        className="card-body"
        onSubmit={(e) => {
          e.preventDefault();
          e.target.reset();
          editor.appendData(content);
          setPreviewContent(editor.generateFinalContent());
          //clear state
          setContent({
            title: "",
            bodyContent: "",
            type: Content.Text,
          });
          setType(Content.Text);
        }}
      >
        <div className="page-header mt-5">
          <span className="page-subtitle">Content Body</span>
        </div>
        <InputBox
          type={Content.Title}
          name={"title"}
          title={"title"}
          onChange={addContent}
        />
        <TypeSelection onChange={changeType} />
        <div className="py-3">
          <InputBox
            name={"bodyContent"}
            title={"content"}
            type={contentType}
            onChange={addContent}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}

function PreviewContent({ content }) {
  const data = content.content.map((cell, index) => {
    if (Content.Text === cell.type) {
      return (
        <div key={index}>
          {cell.title && <h4 className="mt-3">{cell.title}</h4>}
          {cell.bodyContent && <div>{cell.bodyContent}</div>}
        </div>
      );
    }

    if (cell.type === Content.List) {
      return (
        <ol className="list-group  list-group-flush list-group-numbered ">
          {cell.title && <h4 className="mt-3">{cell.title}</h4>}
          {cell.bodyContent.map((item, index) => {
            return (
              <li key={index} className="list-group-item">
                {item}
              </li>
            );
          })}
        </ol>
      );
    }
    if (cell.type === Content.Img) {
      const url = window.URL.createObjectURL(cell.bodyContent[0]);
      console.log(url);
      return (
        <div>
          <img
            src={url}
            className="rounded mx-auto d-block img-fluid"
            alt="pic"
          ></img>
        </div>
      );
    }
  });

  return <div className="card-body">{data}</div>;
}

function ContentMetaData({ saveMetaData }) {
  const [metadata, setMetadata] = React.useState({
    title: "",
    category: "",
    thumbnail: "",
  });
  const change = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };
  return (
    <div className="card">
      <form
        className="p-3 card-body"
        onSubmit={(e_) => {
          e_.preventDefault();
          saveMetaData(metadata);
        }}
      >
        <div className="page-header mt-5">
          <span className="page-subtitle">Meta Data</span>
        </div>
        <div className="mb-3">
          <label for="Category" className="form-label">
            Category
          </label>
          <input
            type="category"
            className="form-control"
            id="Category"
            name="category"
            aria-describedby="Category"
            required
            onChange={change}
          />
        </div>

        <div className="mb-3">
          <label for="title" className="form-label">
            Title
          </label>
          <input
            type="title"
            className="form-control"
            id="title"
            name="title"
            onChange={change}
            aria-describedby="title"
          />
        </div>

        <div className="mb-3">
          <label for="thumbNail" className="form-label">
            ThumbNail
          </label>
          <input
            type="file"
            required="true"
            className="form-control"
            id="thumbNail"
            name="thumbnail"
            onChange={(e) => {
              setMetadata({ ...metadata, thumbnail: e.target.files[0] });
            }}
            aria-describedby="thumbNail"
          />
        </div>

        <button type="submit" className="btn btn-primary d-block mx-auto">
          Save Meta data
        </button>
      </form>
    </div>
  );
}
