import React from "react";
import PageTitle from "../../pageTitle";

function CreateNews() {
  const [newsItem, setNewsItem] = React.useState({
    title: "",
    content: "",
  });
  const create = async (e) => {
    e.preventDefault();
    const files = fileRef.current.files;
    const formData = new FormData();
    formData.append("image", files[0]);
    for (const key in newsItem) {
      if (Object.hasOwnProperty.call(newsItem, key)) {
        formData.append(key, newsItem[key]);
      }
    }
    //TODO - call create news api
  };
  const fileRef = React.useRef();
  const handleChange = (e) => {
    setNewsItem({ ...newsItem, [e.target.name]: e.target.value });
  };
  return (
    <div className="mx-2">
      <PageTitle title="Create News" sutitle="News" />
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
            rows="5"
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
