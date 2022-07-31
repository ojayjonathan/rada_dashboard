import classNames from "classnames";
import { Link } from "react-router-dom";
import { useDeleteNews, useNews } from "../../../rest/hooks/content";
import { APP_ROUTES, IMAGE_URL } from "../../../utils/constants";
import Button from "../../ui/button";
import PageTitle from "../../ui/pageTitle";
import NewsSkeleton from "./news.skeleton";

function NewsComponent() {
  const { data, isLoading } = useNews();
  const {
    mutate: deleteNews,
    isLoading: deleting,
    variables: currentForumId,
  } = useDeleteNews();

  const primaryBtn = classNames("btn", "btn-primary", "fs-6", "py-1", "px-4");

  return (
    <div className="mx-2">
      <PageTitle title="News" subtitle="News" />
      {isLoading && (
        <div className="row">
          {[...Array(3)].map((_, key) => (
            <div key={key} className="col-12 col-md-6 col-lg-4 mb-3 px-2">
              <NewsSkeleton />
            </div>
          ))}
        </div>
      )}
      {!isLoading && (
        <>
          <div className="row">
            {data?.news &&
              data.news.map((item, key) => (
                <div key={key} className="col-12 col-md-6 col-lg-4 mb-3 px-2">
                  <div className="card">
                    <div
                      style={{
                        minHeight: "150px",
                        backgroundImage: `url(${IMAGE_URL + item.image})`,
                        backgroundSize: "cover",
                        maxHeight: "200px",
                        overflow: "hidden",
                      }}
                    ></div>
                    <div className="card-body mb-0">
                      <h5 className="text-center my-1">{item.title}</h5>
                      <p className="text-muted">{item.content}</p>
                        <Button
                          onClick={() => deleteNews(item._id!.toString())}
                          label="Delete"
                          loading={deleting && currentForumId == item._id}
                          buttonType="danger"
                        />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <Link className={primaryBtn} to={APP_ROUTES.createNews}>
              Create
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default NewsComponent;
