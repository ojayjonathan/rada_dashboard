import React from "react";
import Card from "../card";
import Modal from "../modal/index";
import { DashboardContext } from "../dashboard";
import { createForums } from "../../utils/services/counselling.services";
import { IMAGE_URL } from "../../utils/constants";
import { snackBarClasses } from "../snackar";
import ForumSkeleton from "./skeleton.forum";
import "./index.css";

const ForumContext = React.createContext();
function ForumItem({ item }) {
  const { edit } = React.useContext(ForumContext);
  return (
    <div
      style={{ lineHeight: "normal" }}
      className="my-2  d-flex justify-content-between align-items-center"
    >
      <div className="forum-thumbnail me-2">
        <img src={IMAGE_URL + item.image} alt="user profile" />
      </div>
      <div className="flex-grow-1">
        <h6 className="my-0">{item.title}</h6>
        <small className="text-muted">{item.description}</small>
      </div>
      <div>
        <span
          onClick={() => edit(item)}
          className="material-icons text-primary btn fs-3"
        >
          edit
        </span>
      </div>
    </div>
  );
}

const Forum = () => {
  const { isLoading, forums, showSnackBar } =
    React.useContext(DashboardContext);
  const [isEditing, setEdit] = React.useState(false);
  const [selectedForum, setSelectedForum] = React.useState({
    title: "",
    description: "",
  });
  const edit = (forum) => {
    setEdit(true);
    setSelectedForum(forum);
  };
  const addForum = async (e) => {
    e.preventDefault();
    setEdit(false);

    const formData = new FormData();
    if (selectedForum.file) {
      formData.append("image", selectedForum.file, selectedForum.file.name);
    }
    formData.append('title', selectedForum.title);
    formData.append("description", selectedForum.description);
    const res = await createForums(formData);
    if (res.forum) {
      showSnackBar(
        res.forum.message || res.forum.msg||"forum created successfuly",
        snackBarClasses.success
      );
    } else {
      showSnackBar(res.message, snackBarClasses.danger);
    }
  };
  const handleChange = (e) => {
    setSelectedForum({ ...selectedForum, [e.target.name]: e.target.value });
  };
  const fileRef = React.useRef();
  return (
    <ForumContext.Provider value={{ edit }}>
      {isLoading ? (
        <ForumSkeleton />
      ) : (
        <Card title="Forums">
          {forums.map((forum, i) => (
            <ForumItem item={forum} key={i} />
          ))}
          <div>
            <button
              onClick={() => setEdit(true)}
              className="btn btn-primary fs-6 py-1"
            >
              Add New
            </button>
          </div>
        </Card>
      )}
      {isEditing && (
        <Modal
          title="Create Forum"
          closeModal={() => setEdit(false)}
          confirm={addForum}
        >
          <form onSubmit={addForum}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Forum Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                id="title"
                value={selectedForum.title}
                placeholder="forum name"
                name="title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                onChange={handleChange}
                name="description"
                value={selectedForum.description}
                className="form-control"
                id="description"
                rows="3"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Photo
              </label>
              <input
                onChange={(e) =>
                  setSelectedForum({
                    ...selectedForum,
                    file: e.target.files[0],
                  })
                }
                type="file"
                className="form-control"
                id="file"
                name="image"
                placeholder="forum name"
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </ForumContext.Provider>
  );
};

export default Forum;
