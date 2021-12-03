import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { APP_ROUTES, IMAGE_URL } from "../../../utils/constants";
import { deleteNews, getNews } from "../../../utils/services/content.service";
import { DashboardContext } from "../../dashboard";
import PageTitle from "../../pageTitle";
import { snackBarClasses } from "../../snackar";
import NewsSkeleton from "./news.skeleton";

function News() {
  const [news, setNews] = React.useState();
  const { showSnackBar } = React.useContext(DashboardContext);
  React.useEffect(() => {
    const init = async () => {
      const newsRes = await getNews();
      if (newsRes.news) {
        setNews(newsRes.news);
      }
    };
    init();
  }, []);

  const deletenews_ = async (newsItem) => {
    let r = window.confirm(
      `Are you sure you want to delete news - ${newsItem.title}`
    );
    if (r === true) {
      const res = await deleteNews(newsItem._id);
      if (res.news) {
        const updatednews = news.filter((c) => c._id !== res.news._id);
        setNews(updatednews);
        showSnackBar("News deleted successfuly!", snackBarClasses.success);
      } else {
        showSnackBar(res.message, snackBarClasses.danger);
      }
    }
  };
  const primaryBtn = classNames("btn", "btn-primary", "fs-6", "py-1", "px-4");
  const dangerBtn = classNames("btn", "btn-danger", "fs-6", "py-1", "px-4");
  return (
    <div className="mx-2">
      <PageTitle title="News" sutitle="News" />
      <div className="row">
        {news &&
          news.map((item, key) => (
            <div key={key} className="col-12 col-md-6 col-lg-4 mb-3 px-2">
              <div className="card">
                <div style={{ minHeight: "150px" }}>
                  <img
                    className="card-img-top"
                    src={IMAGE_URL + item.image}
                    alt={item.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="text-center my-1">{item.title}</h5>
                  <p className="text-muted">{item.content}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => deletenews_(item)}
                      className={dangerBtn}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!news && (
          <>
            {[...Array(3)].map((_,key) => (
              <NewsSkeleton key={key}/>
            ))}
          </>
        )}
      </div>
      <div>
        <Link className={primaryBtn} to={APP_ROUTES.createNews}>
          Create
        </Link>
      </div>
    </div>
  );
}

export default News;
