import React, { useState } from "react";
import Card from "../card";
import img from "../../assets/images/image 3.png";
import Modal from "../modal/index";
import { DashboardContext } from "../dashboard";
import { createForums } from "../../utils/services/counselling.services";
import { IMAGE_URL } from "../../utils/constants";
import { snackBarClasses } from "../snackar";

const ForumContext = React.createContext();
function ForumItem({ item }) {
  const { edit } = React.useContext(ForumContext);
  return (
    <div
      style={{ lineHeight: "normal" }}
      className="mb-1  d-flex justify-content-between align-items-center"
    >
      <div className="profile-thumbnail mb-4">
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
  const { forums, showSnackBar } = React.useContext(DashboardContext);
  const [isEditing, setEdit] = React.useState(false);
  const [selectedForum, setSelectedForum] = React.useState({
    title: "",
    description: "",
  });
  const edit = (forum) => {
    setEdit(true);
    setSelectedForum(forum);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEdit(false);
    const files = fileRef.current.files;
    const formData = new FormData();
    formData.append("image", files[0]);
    for (const key in selectedForum) {
      if (Object.hasOwnProperty.call(selectedForum, key)) {
        formData.append(key, selectedForum[key]);
      }
    }
    const res = await createForums(formData);
    if (res.forums) {
      showSnackBar(
        res.forums.message || res.forums.msg,
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
      {isEditing && (
        <Modal
          title="Create Forum"
          closeModal={() => setEdit(false)}
          confirm={handleSubmit}
        >
          <form onSubmit={handleSubmit}>
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Photo
              </label>
              <input
                ref={fileRef}
                type="file"
                className="form-control"
                id="file"
                name="image"
                placeholder="forum name"
              />
            </div>
          </form>
        </Modal>
      )}
    </ForumContext.Provider>
  );
};

export default Forum;
