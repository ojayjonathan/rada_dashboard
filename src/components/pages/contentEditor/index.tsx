import React from "react";
import {
  Content,
  ContentMetadata,
  ContentType,
  QuillDeltaOperation,
} from "../../../types/types";
import { createContent } from "../../../utils/services/content";
import InputBox from "../../DefaultContentInputs/InputBox";
import TypeSelection from "../../DefaultContentInputs/TypeSelection";
import PageTitle from "../../pageTitle";
import { EditorData } from "./editor";

function ContentEditor() {
  const editor = React.useRef(new EditorData());
  const [contentType, setType] = React.useState(ContentType.Text);
  const [previewContent, setPreviewContent] = React.useState<{
    metadata: Partial<ContentMetadata>;
    content: Content;
  }>({
    metadata: {},
    content: [],
  });

  const [content, setContent] = React.useState<{
    bodyContent: any;
    type: ContentType;
    subTitle?: string;
  }>({
    bodyContent: "",
    type: ContentType.Text,
  });

  const changeType = (e: any) => {
    setType(e.target.value);
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };
  const saveMetaData = (metadata: Partial<ContentMetadata>) => {
    editor.current.metadata = metadata;
  };
  return (
    <div className="container  ">
      <PageTitle title="New Content" subtitle="content Editor" />
      <div>
        <div className="d-flex align-items-start ">
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
          <div
            className="col-12 col-lg-6  py-3 px-3"
            style={{ alignSelf: "stretch" }}
          >
            <div className="card">
              <span className="page-subtitle mx-auto py-2 d-block">
                Preview
              </span>
              <PreviewContent content={previewContent.content} />
              <div className=" d-flex">
                <button
                  onClick={() =>
                    document.getElementById("content")?.scrollIntoView({
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
                  onClick={() => {
                    if (editor.current.isEditorValid()) {
                      createContent(editor.current.generateFormData());
                    }
                  }}
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
type EditorProps = {
  editor: EditorData;
  content: {
    bodyContent: any;
    type: ContentType;
    subTitle?: string;
  };
  changeType: (e: any) => void;
  setContent: React.Dispatch<
    React.SetStateAction<{
      bodyContent: any;
      type: ContentType;
      subTitle?: string;
    }>
  >;
  contentType: ContentType;
  setPreviewContent: React.Dispatch<
    React.SetStateAction<{
      metadata: Partial<ContentMetadata>;
      content: Content;
    }>
  >;
  setType: React.Dispatch<React.SetStateAction<ContentType>>;
};

function EditorElement({
  editor,
  content,
  changeType,
  setContent,
  contentType,
  setPreviewContent,
  setType,
}: EditorProps) {
  const addContent = (e: any) => {
    if (contentType !== ContentType.Img) {
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
          editor.appendData(content);
          setPreviewContent(editor.generateFinalContent());
          //clear state
          setContent({
            subTitle: "",
            bodyContent: "",
            type: ContentType.Text,
          });
          setType(ContentType.Text);
        }}
      >
        <div className="page-header mt-5">
          <span className="page-subtitle">Content Body</span>
        </div>
        <InputBox
          type={ContentType.Title}
          name={"subTitle"}
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

function PreviewContent({ content }: { content: QuillDeltaOperation[] }) {
  const data = content.map((cell: any, index: number) => {
    if (ContentType.Text === cell.type) {
      return (
        <div key={index}>
          {cell.subTitle && <h4 className="mt-3">{cell.subTitle}</h4>}
          {cell.bodyContent && <div>{cell.bodyContent}</div>}
        </div>
      );
    }

    if (cell.type === ContentType.List) {
      return (
        <ol className="list-group  list-group-flush list-group-numbered ">
          {cell.subTitle && <h4 className="mt-3">{cell.subTitle}</h4>}
          {cell.bodyContent.map((item: string, index: number) => {
            return (
              <li key={index} className="list-group-item">
                {item}
              </li>
            );
          })}
        </ol>
      );
    }
    if (cell.type === ContentType.Img) {
      const url = window.URL.createObjectURL(cell.bodyContent[0]);
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

function ContentMetaData({ saveMetaData }: { saveMetaData: any }) {
  const [metadata, setMetadata] = React.useState<Partial<ContentMetadata>>({
    title: "",
    category: "",
    thumbnail: null,
  });
  const change = (e: any) => {
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
          <label htmlFor="Category" className="form-label">
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
          <label htmlFor="title" className="form-label">
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
          <label htmlFor="thumbNail" className="form-label">
            ThumbNail
          </label>
          <input
            type="file"
            required={true}
            className="form-control"
            id="thumbNail"
            name="thumbnail"
            onChange={(e) => {
              setMetadata({ ...metadata, thumbnail: e.target.files?.[0] });
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
