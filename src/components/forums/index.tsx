import React from "react";
import Card from "../card";
import Modal from "../modal/index";
import { DashboardContext } from "../dashboard";
import { createForums, deleteForums } from "../../utils/services/counselling";
import { IMAGE_URL } from "../../utils/constants";
import ForumSkeleton from "./skeleton.forum";
import "./index.css";
import { Group } from "../../types/types";

interface ForumState {
  edit: (forum: Group) => void;
  deleteForum: (id: string) => any;
}
const ForumContext = React.createContext<Partial<ForumState>>({});

function ForumItem({ item }: { item: Group }) {
  const { deleteForum } = React.useContext(ForumContext);

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
        {/* <span
          onClick={() => edit(item)}
          className="material-icons text-primary btn fs-3"
        >
          edit */}
        {/* </span> */}
        <span
          onClick={() => deleteForum?.(item.id!?.toString())}
          className="material-icons text-danger btn fs-3"
        >
          delete
        </span>
      </div>
    </div>
  );
}

const Forum = () => {
  const {
    isLoading,
    forums = [],
    setForums,
    showSnackBar,
  } = React.useContext(DashboardContext);
  const [isEditing, setEdit] = React.useState(false);
  const [forumEdit, setForumInEdit] = React.useState<{
    file?: any;
    title: string;
    description?: string;
    id?: string | number;
  }>({
    title: "",
    description: "",
  });
  const edit = (forum: Group) => {
    setEdit(true);
    setForumInEdit({
      description: forum.description,
      title: forum.title,
      id: forum.id,
    });
  };
  const addForum = async (e?: any) => {
    e?.preventDefault();

    const formData = new FormData();
    if (forumEdit.file) {
      formData.append("image", forumEdit.file, forumEdit.file.name);
    }
    formData.append("title", forumEdit.title);
    formData.append("description", forumEdit.description!);
    const res = await createForums(formData);
    if (res.ok) {
      showSnackBar?.({
        className: "success",
        message: "forum created successfuly",
      });
      setForums?.([...(forums ?? []), res.response]);
      setEdit(false);
    } else {
      showSnackBar?.({
        className: "danger",
        message: res.errorMessage.message,
      });
    }
  };
  const handleChange = (e: any) => {
    setForumInEdit({ ...forumEdit, [e.target.name]: e.target.value });
  };
  const deleteForum_ = async (id: string) => {
    const result = await deleteForums(id);
    if (result.ok) {
      setForums?.(forums!.filter((forum) => forum.id !== result.response.id));
      showSnackBar?.({
        className: "success",
        message: "Forumn deleted",
      });
    } else {
    }
  };
  return (
    <ForumContext.Provider value={{ edit, deleteForum: deleteForum_ }}>
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
          confirm={() => addForum()}
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
                value={forumEdit.title}
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
                value={forumEdit.description}
                className="form-control"
                id="description"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Photo
              </label>
              <input
                onChange={(e: any) =>
                  setForumInEdit({
                    ...forumEdit,
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
