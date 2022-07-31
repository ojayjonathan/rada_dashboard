import "./index.css";
import { Link } from "react-router-dom";
import { APP_ROUTES, IMAGE_URL } from "../../../utils/constants";
import PageTitle from "../../ui/pageTitle";
import { useContent, useDeleteContent } from "../../../rest/hooks/content";
import toast from "../../../toast";
import { InformationContent } from "../../../types/types";
import NewsSkeleton from "../news/news.skeleton";
import { useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "../../../rest/client/api-endpoints";
import Button from "../../ui/button";

const ContentCard = ({ item }: { item: InformationContent }) => {
  const { mutate: deleteContent, isLoading } = useDeleteContent();
  return (
    <div className="card">
      <div
        style={{
          minHeight: "150px",
          backgroundImage: `url(${IMAGE_URL + item.metadata.thumbnail})`,
          backgroundSize: "cover",
          maxHeight: "300px",
          overflow: "hidden",
        }}
      ></div>

      <div className="card-body">
        <span className="content-category">{item.metadata.title}</span>
        <p className="text-muted"></p>
        <div>
          <Link
            to={{ pathname: APP_ROUTES.createContent }}
            state={item}
            className="btn btn-primary fs-6 py-1 px-4"
          >
            Edit
          </Link>
          <Button
            loading={isLoading}
            label="Delete"
            buttonType="danger"
            disabled={isLoading}
            onClick={() => deleteContent(item._id!)}
            className="fs-6 py-1 px-4 ms-5"
          />
        </div>
      </div>
    </div>
  );
};

export default function Content() {
  const { data, isLoading, error } = useContent();
  const query = useQueryClient();

  if (error) {
    toast.error({
      message: error.message,
      options: {
        customButtons: [
          {
            label: "Retry",
            onClick: () => query.invalidateQueries([API_ENDPOINTS.CONTENT]),
          },
        ],
      },
    });
  }

  return (
    <div className="container">
      <PageTitle title="Content" subtitle="content" />
      <div className="row">
        {isLoading && (
          <div className="row">
            {[...Array(3)].map((_, key) => (
              <div key={key} className="col-12 col-md-6 col-lg-4 mb-3 px-2">
                <NewsSkeleton />
              </div>
            ))}
          </div>
        )}
        {data?.content.map((item, key) => (
          <div key={key} className="col-12 col-md-6 col-lg-4 mb-3 px-2">
            <ContentCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
