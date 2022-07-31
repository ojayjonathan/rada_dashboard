  import { APP_ROUTES, IMAGE_URL } from "../../utils/constants";
import ForumSkeleton from "./skeleton.forum";
import "./index.css";
import { Group } from "../../types/types";
import { useDeleteForum, useForums } from "../../rest/hooks/users";
import { Link } from "react-router-dom";
import Card from "../ui/card";
import toast from "../../toast";

function ForumItem({ item }: { item: Group }) {
  const { mutate, isLoading } = useDeleteForum();
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
        <i
          onClick={() => !isLoading && mutate(item.id + "")}
          className="text-danger fs-3 material-icons"
          role="button"
        >
          delete
        </i>
      </div>
    </div>
  );
}

const Forum = () => {
  const { isLoading, data, error } = useForums();
  if (error) {
    toast.error({ message: error.message });
  }

  if (isLoading) {
    return <ForumSkeleton />;
  }
  return (
    <Card title="Forums">
      <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
        {data?.data.payload.map((forum, i) => (
          <ForumItem item={forum} key={i} />
        ))}
      </div>
      <div>
        <Link to={APP_ROUTES.forumCreate} className="btn btn-primary py-1">
          Create New
        </Link>
      </div>
    </Card>
  );
};

export default Forum;
