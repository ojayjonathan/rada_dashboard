import React from "react";
import PageTitle from "../../pageTitle";

function CreateNews() {
  const [newsItem, setNewsItem] = React.useState({
    title: "",
    content: "",
  });
  const create = async (e: any) => {
    e.preventDefault();
    const files = fileRef.current!.files!;
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("title", newsItem.title);
    formData.append("content", newsItem.content);

    //TODO - call create news api
  };
  const fileRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    setNewsItem({ ...newsItem, [e.target.name]: e.target.value });
  };
  return (
    <div className="mx-2">
      <PageTitle title="Create News" subtitle="News" />
      <div className="card">
        <form className="card-body container-md" onSubmit={create}>
          <input
            value={newsItem.title}
            className="form-control my-3"
            onChange={handleChange}
            placeholder="title"
            name="title"
          />
          <textarea
            value={newsItem.content}
            className="form-control my-3"
            onChange={handleChange}
            placeholder="write something..."
            name="content"
          ></textarea>
          <div className="py-2">
            <label htmlFor="file" className="form-label">
              News Image
            </label>
            <input
              ref={fileRef}
              type="file"
              className="form-control"
              id="file"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNews;
